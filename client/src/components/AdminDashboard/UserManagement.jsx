import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import userService from '../../services/userService';
import useToast from '../../hooks/useToast';
import useModal from '../../hooks/useModal';

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

const RoleBadge = styled.span`
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${({ role, theme }) => {
    switch (role) {
      case 'admin':
        return '#8B5CF6';
      case 'moderator':
        return '#10B981';
      case 'user':
        return '#3B82F6';
      default:
        return theme.backgroundSecondary;
    }
  }};
  color: white;
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${({ status, theme }) => {
    switch (status) {
      case 'active':
        return '#10B981';
      case 'inactive':
        return '#EF4444';
      case 'pending':
        return '#F59E0B';
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
  max-width: 500px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.textColorLight};
  font-size: 14px;
`;

const Input = styled.input`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 6px;
  border: none;
  background: ${({ theme, variant }) =>
    variant === 'secondary' ? theme.backgroundSecondary : theme.primaryColor};
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const Container = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.backgroundPrimary};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.textColor};
  margin: 0;
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${({ theme }) => theme.primaryColor};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }
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

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const toast = useToast();
  const modal = useModal();

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await userService.getAll({
        page: currentPage,
        limit: 10
      });
      setUsers(response.data.users);
      setTotalPages(Math.ceil(response.data.total / 10));
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, [currentPage, toast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    modal.confirm({
      title: 'Delete User',
      message: 'Are you sure you want to delete this user?',
      onConfirm: async () => {
        try {
          await userService.delete(id);
          toast.success('User deleted successfully');
          fetchUsers();
        } catch (error) {
          toast.error('Failed to delete user');
        }
      }
    });
  };

  const handleEdit = (user) => {
    modal.custom('editUser', {
      title: 'Edit User',
      user,
      onSubmit: async (updatedUser) => {
        try {
          await userService.update(user._id, updatedUser);
          toast.success('User updated successfully');
          fetchUsers();
        } catch (error) {
          toast.error('Failed to update user');
        }
      }
    });
  };

  const handleCreate = () => {
    modal.custom('createUser', {
      title: 'Create User',
      onSubmit: async (newUser) => {
        try {
          await userService.create(newUser);
          toast.success('User created successfully');
          fetchUsers();
        } catch (error) {
          toast.error('Failed to create user');
        }
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Header>
        <Title>User Management</Title>
        <CreateButton onClick={handleCreate}>
          <FaPlus /> Add New User
        </CreateButton>
      </Header>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>
                <RoleBadge role={user.role}>{user.role}</RoleBadge>
              </Td>
              <Td>
                <StatusBadge status={user.status}>{user.status}</StatusBadge>
              </Td>
              <Td>
                <ActionButton onClick={() => handleEdit(user)}>
                  <FaEdit />
                </ActionButton>
                <ActionButton onClick={() => handleDelete(user._id)} danger>
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

export default UserManagement;
