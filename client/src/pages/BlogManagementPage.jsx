import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../hooks/useData';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../services/blogService';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.textColor};
  font-size: 2.5rem;
`;

const CreateButton = styled.button`
  background: ${({ theme }) => theme.primaryColor};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  i {
    font-size: 1.2rem;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

const BlogCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const BlogImage = styled.div`
  height: 200px;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogTitle = styled.h3`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.textColor}99;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  i {
    color: ${({ theme }) => theme.primaryColor};
  }
`;

const BlogActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const ActionButton = styled.button`
  background: ${({ theme, variant }) =>
    variant === 'edit'
      ? theme.primaryColor + '11'
      : variant === 'delete'
        ? '#ff000011'
        : theme.backgroundColor};
  color: ${({ theme, variant }) =>
    variant === 'edit' ? theme.primaryColor : variant === 'delete' ? '#ff0000' : theme.textColor};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme, variant }) =>
      variant === 'edit'
        ? theme.primaryColor
        : variant === 'delete'
          ? '#ff0000'
          : theme.primaryColor};
    color: white;
  }

  i {
    font-size: 1rem;
  }
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
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
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
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  background: ${({ theme }) => theme.backgroundColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.textColor};
  padding: 0.8rem;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

const TextArea = styled.textarea`
  background: ${({ theme }) => theme.backgroundColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.textColor};
  padding: 0.8rem;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 200px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const BlogManagementPage = () => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const { data: blogs, loading, error, refetch } = useData(getBlogs);

  const handleCreate = () => {
    setSelectedBlog(null);
    setIsModalOpen(true);
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(blogId);
        refetch();
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const blogData = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      content: formData.get('content'),
      author: currentUser.displayName || 'Anonymous',
      date: new Date().toISOString().split('T')[0]
    };

    try {
      if (selectedBlog) {
        await updateBlog(selectedBlog.id, blogData);
      } else {
        await createBlog(blogData);
      }
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <Container>
      <Header>
        <Title theme={theme}>Blog Management</Title>
        <CreateButton onClick={handleCreate} theme={theme}>
          <i className="fas fa-plus"></i>
          Create New Post
        </CreateButton>
      </Header>

      <BlogGrid>
        {blogs?.map((blog) => (
          <BlogCard key={blog.id} theme={theme}>
            {blog.imageUrl && <BlogImage src={blog.imageUrl} />}
            <BlogContent>
              <BlogTitle theme={theme}>{blog.title}</BlogTitle>
              <BlogMeta theme={theme}>
                <MetaItem theme={theme}>
                  <i className="far fa-calendar"></i>
                  {blog.date}
                </MetaItem>
                <MetaItem theme={theme}>
                  <i className="far fa-user"></i>
                  {blog.author}
                </MetaItem>
              </BlogMeta>
              <BlogActions>
                <ActionButton theme={theme} variant="edit" onClick={() => handleEdit(blog)}>
                  <i className="fas fa-edit"></i>
                  Edit
                </ActionButton>
                <ActionButton theme={theme} variant="delete" onClick={() => handleDelete(blog.id)}>
                  <i className="fas fa-trash"></i>
                  Delete
                </ActionButton>
              </BlogActions>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>

      {isModalOpen && (
        <Modal onClick={() => setIsModalOpen(false)}>
          <ModalContent theme={theme} onClick={(e) => e.stopPropagation()}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label theme={theme}>Title</Label>
                <Input theme={theme} name="title" defaultValue={selectedBlog?.title} required />
              </FormGroup>
              <FormGroup>
                <Label theme={theme}>Summary</Label>
                <TextArea
                  theme={theme}
                  name="summary"
                  defaultValue={selectedBlog?.summary}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label theme={theme}>Content</Label>
                <TextArea
                  theme={theme}
                  name="content"
                  defaultValue={selectedBlog?.content}
                  required
                />
              </FormGroup>
              <ButtonGroup>
                <ActionButton type="submit" theme={theme} variant="edit">
                  {selectedBlog ? 'Update' : 'Create'} Post
                </ActionButton>
                <ActionButton
                  type="button"
                  theme={theme}
                  variant="delete"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </ActionButton>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default BlogManagementPage;
