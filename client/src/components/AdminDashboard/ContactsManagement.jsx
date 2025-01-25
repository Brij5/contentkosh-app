import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaPhone, FaUser, FaTrash } from 'react-icons/fa';
import contactService from '../../services/contactService';
import useToast from '../../hooks/useToast';
import useModal from '../../hooks/useModal';

// Styled Components
const Container = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.backgroundPrimary};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  overflow: hidden;
`;

const Th = styled.th`
  padding: 12px;
  text-align: left;
  background: ${({ theme }) => theme.backgroundSecondary};
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;
`;

const Td = styled.td`
  padding: 12px;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.textColor};
`;

const Status = styled.span`
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${({ status, theme }) => {
    switch (status) {
      case 'new':
        return '#3B82F6';
      case 'in_progress':
        return '#F59E0B';
      case 'completed':
        return '#10B981';
      case 'archived':
        return '#6B7280';
      default:
        return theme.backgroundSecondary;
    }
  }};
  color: white;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ active, theme }) => active ? theme.primaryColor : 'transparent'};
  color: ${({ active, theme }) => active ? 'white' : theme.textColor};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${({ theme }) => theme.primaryColor};
    color: white;
  }
`;

const ActionButton = styled.button`
  padding: 6px;
  margin: 0 3px;
  background: none;
  border: none;
  color: ${({ theme, variant }) => {
    switch (variant) {
      case 'view':
        return theme.primaryColor;
      case 'edit':
        return '#10B981';
      case 'delete':
        return '#EF4444';
      default:
        return theme.textColor;
    }
  }};
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${({ status, theme }) => {
    switch (status) {
      case 'new':
        return '#3B82F6';
      case 'in_progress':
        return '#F59E0B';
      case 'completed':
        return '#10B981';
      case 'archived':
        return '#6B7280';
      default:
        return theme.backgroundSecondary;
    }
  }};
  color: white;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const ModalTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.textColor};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  font-size: 20px;
  padding: 5px;

  &:hover {
    opacity: 0.8;
  }
`;

const Field = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.textColorLight};
  margin-bottom: 5px;
`;

const Value = styled.div`
  color: ${({ theme }) => theme.textColor};
`;

const ContactsManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const toast = useToast();
  const modal = useModal();

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await contactService.getAll({
        page: currentPage,
        limit: 10
      });
      setContacts(response.data.contacts);
      setTotalPages(Math.ceil(response.data.total / 10));
    } catch (error) {
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  }, [currentPage, toast]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    modal.confirm({
      title: 'Delete Contact',
      message: 'Are you sure you want to delete this contact?',
      onConfirm: async () => {
        try {
          await contactService.delete(id);
          toast.success('Contact deleted successfully');
          fetchContacts();
        } catch (error) {
          toast.error('Failed to delete contact');
        }
      }
    });
  };

  const handleMarkAsRead = async (id) => {
    try {
      await contactService.markAsRead(id);
      toast.success('Contact marked as read');
      fetchContacts();
    } catch (error) {
      toast.error('Failed to mark contact as read');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title>Contact Management</Title>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Message</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <Td>
                <FaUser /> {contact.name}
              </Td>
              <Td>
                <FaEnvelope /> {contact.email}
              </Td>
              <Td>
                <FaPhone /> {contact.phone}
              </Td>
              <Td>{contact.message}</Td>
              <Td>
                <Status status={contact.status}>{contact.status}</Status>
              </Td>
              <Td>
                <ActionButton onClick={() => handleMarkAsRead(contact._id)}>
                  Mark as Read
                </ActionButton>
                <ActionButton onClick={() => handleDelete(contact._id)} danger>
                  <FaTrash />
                </ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton
            key={i + 1}
            active={currentPage === i + 1}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </PageButton>
        ))}
      </Pagination>
    </Container>
  );
};

export default ContactsManagement;
