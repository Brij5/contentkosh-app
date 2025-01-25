import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiCheck,
  FiX,
  FiFileText,
  FiImage,
  FiVideo,
  FiLink,
  FiAlertCircle,
  FiUpload
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
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 120px;
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
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 120px;
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

const ContentTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 500;
`;

const ContentIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${({ theme }) => theme.primaryColor}15;
  color: ${({ theme }) => theme.primaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

const ContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ContentMeta = styled.div`
  color: ${({ theme }) => theme.textColorLight};
  font-size: 0.75rem;
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
      case 'published':
        return `
          background: ${theme.successColor}15;
          color: ${theme.successColor};
        `;
      case 'draft':
        return `
          background: ${theme.warningColor}15;
          color: ${theme.warningColor};
        `;
      case 'archived':
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

const getContentIcon = (type) => {
  switch (type) {
    case 'article':
      return <FiFileText />;
    case 'image':
      return <FiImage />;
    case 'video':
      return <FiVideo />;
    case 'link':
      return <FiLink />;
    default:
      return <FiFileText />;
  }
};

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

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  background: ${({ theme }) => theme.backgroundSecondary};
  color: ${({ theme }) => theme.textColor};
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

const UploadArea = styled.div`
  border: 2px dashed ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primaryColor};
  }

  svg {
    font-size: 2rem;
    color: ${({ theme }) => theme.textColorLight};
    margin-bottom: 1rem;
  }

  p {
    color: ${({ theme }) => theme.textColorLight};
    margin: 0;
  }
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

const PreviewContent = styled.div`
  padding: 1rem;
  max-height: 70vh;
  overflow-y: auto;
`;

const Content = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedContent, setSelectedContent] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Mock data - replace with API call
  const content = [
    {
      id: 1,
      title: 'Getting Started with React',
      type: 'article',
      author: 'John Doe',
      status: 'published',
      views: '1.2k',
      lastModified: '2 hours ago'
    },
    {
      id: 2,
      title: 'Product Launch Video',
      type: 'video',
      author: 'Sarah Smith',
      status: 'draft',
      views: '0',
      lastModified: '1 day ago'
    },
    {
      id: 3,
      title: 'Design Resources',
      type: 'link',
      author: 'Mike Johnson',
      status: 'published',
      views: '856',
      lastModified: '1 week ago'
    }
  ];

  const initialFormState = {
    title: '',
    type: 'article',
    content: '',
    status: 'draft'
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddContent = (e) => {
    e.preventDefault();
    // Implement add content functionality
    console.log('Add content:', formData);
    setIsAddModalOpen(false);
    setFormData(initialFormState);
    showToast('Content added successfully', 'success');
  };

  const handleEditContent = (e) => {
    e.preventDefault();
    // Implement edit content functionality
    console.log('Edit content:', formData);
    setIsEditModalOpen(false);
    showToast('Content updated successfully', 'success');
  };

  const handleDeleteContent = () => {
    // Implement delete content functionality
    console.log('Delete content:', selectedContent?.id);
    setIsDeleteModalOpen(false);
    showToast('Content deleted successfully', 'success');
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const openEditModal = (content) => {
    setSelectedContent(content);
    setFormData({
      title: content.title,
      type: content.type,
      content: content.content || '',
      status: content.status
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (content) => {
    setSelectedContent(content);
    setIsDeleteModalOpen(true);
  };

  const openPreviewModal = (content) => {
    setSelectedContent(content);
    setIsPreviewModalOpen(true);
  };

  const renderContentForm = () => (
    <Form onSubmit={isAddModalOpen ? handleAddContent : handleEditContent}>
      <FormGroup>
        <Label>Title</Label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleFormChange}
          placeholder="Enter content title"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Type</Label>
        <Dropdown
          options={[
            { label: 'Article', value: 'article' },
            { label: 'Video', value: 'video' },
            { label: 'Image', value: 'image' },
            { label: 'Link', value: 'link' }
          ]}
          value={formData.type}
          onChange={(value) => handleFormChange({ target: { name: 'type', value } })}
        />
      </FormGroup>
      {formData.type === 'article' && (
        <FormGroup>
          <Label>Content</Label>
          <TextArea
            name="content"
            value={formData.content}
            onChange={handleFormChange}
            placeholder="Write your content here..."
            required
          />
        </FormGroup>
      )}
      {(formData.type === 'image' || formData.type === 'video') && (
        <FormGroup>
          <Label>Upload {formData.type}</Label>
          <UploadArea>
            <FiUpload />
            <p>Click or drag to upload {formData.type}</p>
          </UploadArea>
        </FormGroup>
      )}
      {formData.type === 'link' && (
        <FormGroup>
          <Label>URL</Label>
          <Input
            name="content"
            value={formData.content}
            onChange={handleFormChange}
            placeholder="Enter URL"
            required
          />
        </FormGroup>
      )}
      <FormGroup>
        <Label>Status</Label>
        <Dropdown
          options={[
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
            { label: 'Archived', value: 'archived' }
          ]}
          value={formData.status}
          onChange={(value) => handleFormChange({ target: { name: 'status', value } })}
        />
      </FormGroup>
      <ModalActions>
        <Button
          type="button"
          variant="secondary"
          onClick={() => isAddModalOpen ? setIsAddModalOpen(false) : setIsEditModalOpen(false)}
        >
          Cancel
        </Button>
        <Button type="submit">
          {isAddModalOpen ? 'Add Content' : 'Save Changes'}
        </Button>
      </ModalActions>
    </Form>
  );

  return (
    <Container>
      <Header>
        <Title>Content</Title>
        <Button onClick={() => setIsAddModalOpen(true)}>Add Content</Button>
      </Header>

      <Controls>
        <SearchBar>
          <FiSearch size={18} />
          <SearchInput
            type="text"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBar>
        <Dropdown
          icon={<FiFilter />}
          options={[
            { label: 'All Content', value: 'all' },
            { label: 'Published', value: 'published' },
            { label: 'Drafts', value: 'draft' },
            { label: 'Archived', value: 'archived' },
            { label: 'Articles', value: 'article' },
            { label: 'Videos', value: 'video' },
            { label: 'Links', value: 'link' }
          ]}
          value={filter}
          onChange={(value) => setFilter(value)}
        />
      </Controls>

      <Table>
        <TableHeader>
          <span>Title</span>
          <span>Author</span>
          <span>Status</span>
          <span>Views</span>
          <span>Last Modified</span>
          <span>Actions</span>
        </TableHeader>

        {content.map((item) => (
          <TableRow
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ContentTitle>
              <ContentIcon>{getContentIcon(item.type)}</ContentIcon>
              <ContentInfo>
                {item.title}
                <ContentMeta>{item.type}</ContentMeta>
              </ContentInfo>
            </ContentTitle>
            <div>{item.author}</div>
            <Status status={item.status}>
              {item.status === 'published' ? <FiCheck size={12} /> : <FiX size={12} />}
              {item.status}
            </Status>
            <div>{item.views}</div>
            <div>{item.lastModified}</div>
            <Actions>
              <IconButton onClick={() => openPreviewModal(item)} title="Preview content">
                <FiEye size={16} />
              </IconButton>
              <IconButton onClick={() => openEditModal(item)} title="Edit content">
                <FiEdit2 size={16} />
              </IconButton>
              <IconButton onClick={() => openDeleteModal(item)} title="Delete content">
                <FiTrash2 size={16} />
              </IconButton>
            </Actions>
          </TableRow>
        ))}
      </Table>

      {/* Add Content Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Content"
      >
        {renderContentForm()}
      </Modal>

      {/* Edit Content Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Content"
      >
        {renderContentForm()}
      </Modal>

      {/* Delete Content Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Content"
      >
        <DeleteConfirmation>
          <FiAlertCircle />
          <p>Are you sure you want to delete "{selectedContent?.title}"? This action cannot be undone.</p>
          <ModalActions>
            <Button type="button" variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="danger" onClick={handleDeleteContent}>
              Delete Content
            </Button>
          </ModalActions>
        </DeleteConfirmation>
      </Modal>

      {/* Preview Content Modal */}
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        title={selectedContent?.title}
      >
        <PreviewContent>
          {selectedContent?.content || 'No preview available'}
        </PreviewContent>
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

export default Content; 