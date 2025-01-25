import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiLock,
  FiCheck,
  FiX,
  FiAlertCircle
} from 'react-icons/fi';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import Dropdown from '../../components/shared/Dropdown';
import Modal from '../../components/shared/Modal';
import Toast from '../../components/shared/Toast';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.textColor};
  font-size: 2rem;
  font-weight: 700;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
`;

const SearchBar = styled.div`
  position: relative;
  width: 300px;

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.textColorLight};
  }
`;

const SearchInput = styled(Input)`
  padding-left: 2.75rem;
`;

const Table = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr 120px;
  padding: 1rem 1.5rem;
  background: ${({ theme }) => theme.backgroundSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  gap: 1rem;

  span {
    color: ${({ theme }) => theme.textColorLight};
    font-weight: 600;
    font-size: 0.875rem;
  }
`;

const TableRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr 120px;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  align-items: center;
  gap: 1rem;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.backgroundSecondary};
  }
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 500;
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primaryColor}20;
  color: ${({ theme }) => theme.primaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
`;

const UserEmail = styled.div`
  color: ${({ theme }) => theme.textColorLight};
  font-size: 0.875rem;
`;

const Status = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;

  ${({ status, theme }) => {
    switch (status) {
      case 'active':
        return `
          background: ${theme.successColor}15;
          color: ${theme.successColor};
        `;
      case 'inactive':
        return `
          background: ${theme.errorColor}15;
          color: ${theme.errorColor};
        `;
      default:
        return `
          background: ${theme.textColorLight}15;
          color: ${theme.textColorLight};
        `;
    }
  }}
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColorLight};
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.backgroundSecondary};
    color: ${({ theme }) => theme.textColor};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.textColor};
  font-weight: 500;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const DeleteConfirmation = styled.div`
  text-align: center;
  padding: 1rem;

  svg {
    color: ${({ theme }) => theme.errorColor};
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    color: ${({ theme }) => theme.textColorLight};
    margin-bottom: 2rem;
  }
`;

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Mock data - replace with API call
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2 hours ago'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      role: 'User',
      status: 'active',
      lastLogin: '1 day ago'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'User',
      status: 'inactive',
      lastLogin: '1 week ago'
    }
  ];

  const initialFormState = {
    name: '',
    email: '',
    role: 'user',
    status: 'active'
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    // Implement add user functionality
    console.log('Add user:', formData);
    setIsAddModalOpen(false);
    setFormData(initialFormState);
    showToast('User added successfully', 'success');
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    // Implement edit user functionality
    console.log('Edit user:', formData);
    setIsEditModalOpen(false);
    showToast('User updated successfully', 'success');
  };

  const handleDeleteUser = () => {
    // Implement delete user functionality
    console.log('Delete user:', selectedUser?.id);
    setIsDeleteModalOpen(false);
    showToast('User deleted successfully', 'success');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Implement reset password functionality
    console.log('Reset password for user:', selectedUser?.id);
    setIsResetPasswordModalOpen(false);
    showToast('Password reset email sent', 'success');
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role.toLowerCase(),
      status: user.status
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const openResetPasswordModal = (user) => {
    setSelectedUser(user);
    setIsResetPasswordModalOpen(true);
  };

  return (
    <Container>
      <Header>
        <Title>Users</Title>
        <Button onClick={() => setIsAddModalOpen(true)}>Add User</Button>
      </Header>

      <Controls>
        <SearchBar>
          <FiSearch size={18} />
          <SearchInput
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBar>
        <Dropdown
          icon={<FiFilter />}
          options={[
            { label: 'All Users', value: 'all' },
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
            { label: 'Admins', value: 'admin' },
            { label: 'Users', value: 'user' }
          ]}
          value={filter}
          onChange={(value) => setFilter(value)}
        />
      </Controls>

      <Table>
        <TableHeader>
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Status</span>
          <span>Last Login</span>
          <span>Actions</span>
        </TableHeader>

        {users.map((user) => (
          <TableRow
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <UserName>
              <UserAvatar>{user.name.split(' ').map(n => n[0]).join('').toUpperCase()}</UserAvatar>
              {user.name}
            </UserName>
            <UserEmail>{user.email}</UserEmail>
            <div>{user.role}</div>
            <Status status={user.status}>
              {user.status === 'active' ? <FiCheck size={12} /> : <FiX size={12} />}
              {user.status}
            </Status>
            <div>{user.lastLogin}</div>
            <Actions>
              <IconButton onClick={() => openEditModal(user)} title="Edit user">
                <FiEdit2 size={16} />
              </IconButton>
              <IconButton onClick={() => openDeleteModal(user)} title="Delete user">
                <FiTrash2 size={16} />
              </IconButton>
              <IconButton title="Send email">
                <FiMail size={16} />
              </IconButton>
              <IconButton onClick={() => openResetPasswordModal(user)} title="Reset password">
                <FiLock size={16} />
              </IconButton>
            </Actions>
          </TableRow>
        ))}
      </Table>

      {/* Add User Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New User"
      >
        <Form onSubmit={handleAddUser}>
          <FormGroup>
            <Label>Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="Enter user's name"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="Enter user's email"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Role</Label>
            <Dropdown
              options={[
                { label: 'User', value: 'user' },
                { label: 'Admin', value: 'admin' }
              ]}
              value={formData.role}
              onChange={(value) => handleFormChange({ target: { name: 'role', value } })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Status</Label>
            <Dropdown
              options={[
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' }
              ]}
              value={formData.status}
              onChange={(value) => handleFormChange({ target: { name: 'status', value } })}
            />
          </FormGroup>
          <ModalActions>
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add User</Button>
          </ModalActions>
        </Form>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit User"
      >
        <Form onSubmit={handleEditUser}>
          <FormGroup>
            <Label>Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="Enter user's name"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="Enter user's email"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Role</Label>
            <Dropdown
              options={[
                { label: 'User', value: 'user' },
                { label: 'Admin', value: 'admin' }
              ]}
              value={formData.role}
              onChange={(value) => handleFormChange({ target: { name: 'role', value } })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Status</Label>
            <Dropdown
              options={[
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' }
              ]}
              value={formData.status}
              onChange={(value) => handleFormChange({ target: { name: 'status', value } })}
            />
          </FormGroup>
          <ModalActions>
            <Button type="button" variant="secondary" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </ModalActions>
        </Form>
      </Modal>

      {/* Delete User Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete User"
      >
        <DeleteConfirmation>
          <FiAlertCircle />
          <p>Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.</p>
          <ModalActions>
            <Button type="button" variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="danger" onClick={handleDeleteUser}>
              Delete User
            </Button>
          </ModalActions>
        </DeleteConfirmation>
      </Modal>

      {/* Reset Password Modal */}
      <Modal
        isOpen={isResetPasswordModalOpen}
        onClose={() => setIsResetPasswordModalOpen(false)}
        title="Reset Password"
      >
        <Form onSubmit={handleResetPassword}>
          <p>Send password reset email to {selectedUser?.email}?</p>
          <ModalActions>
            <Button type="button" variant="secondary" onClick={() => setIsResetPasswordModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Send Reset Email</Button>
          </ModalActions>
        </Form>
      </Modal>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <Toast type={toast.type} message={toast.message} />
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Users; 