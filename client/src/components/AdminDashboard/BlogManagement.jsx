import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.textColor};
`;

const CreateButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: ${({ theme }) => theme.primaryColor};
  color: white;
  border-radius: 8px;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.cardBackground};
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  padding: 8px;
  color: ${({ theme }) => theme.textColor};
  font-size: 16px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.textColorLight};
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const BlogCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BlogContent = styled.div`
  padding: 20px;
`;

const BlogTitle = styled.h3`
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 10px;
  font-size: 18px;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.textColorLight};
  font-size: 14px;
  margin-bottom: 15px;
`;

const BlogStatus = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background: ${({ status, theme }) => {
    switch (status) {
      case 'published':
        return '#10B981';
      case 'draft':
        return '#F59E0B';
      default:
        return theme.textColorLight;
    }
  }};
  color: white;
`;

const BlogActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const ActionButton = styled(Link)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  border: none;
  border-radius: 6px;
  background: ${({ variant, theme }) => {
    switch (variant) {
      case 'view':
        return theme.backgroundSecondary;
      case 'edit':
        return '#3B82F6';
      case 'delete':
        return '#EF4444';
      default:
        return theme.backgroundSecondary;
    }
  }};
  color: ${({ variant }) => (variant === 'view' ? 'inherit' : 'white')};
  cursor: pointer;
  transition: opacity 0.2s;
  text-decoration: none;

  &:hover {
    opacity: 0.9;
  }
`;

const DeleteButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  border: none;
  border-radius: 6px;
  background: #ef4444;
  color: white;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: ${({ theme }) => theme.textColorLight};
`;

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/admin/blogs');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch blogs');
      }

      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog post');
      }

      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner>Loading...</LoadingSpinner>;
  }

  return (
    <Container>
      <Header>
        <Title>Blog Management</Title>
        <CreateButton to="/admin/blogs/new">
          <FaPlus /> Create New Blog
        </CreateButton>
      </Header>

      <SearchBar>
        <FaSearch />
        <SearchInput
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>

      <BlogGrid>
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog.id}>
            <BlogImage src={blog.imageUrl} alt={blog.title} />
            <BlogContent>
              <BlogTitle>{blog.title}</BlogTitle>
              <BlogMeta>
                <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                <BlogStatus status={blog.status}>{blog.status}</BlogStatus>
              </BlogMeta>
              <BlogActions>
                <ActionButton variant="view" to={`/blog/${blog.id}`}>
                  <FaEye /> View
                </ActionButton>
                <ActionButton variant="edit" to={`/admin/blogs/edit/${blog.id}`}>
                  <FaEdit /> Edit
                </ActionButton>
                <DeleteButton onClick={() => handleDelete(blog.id)}>
                  <FaTrash /> Delete
                </DeleteButton>
              </BlogActions>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>
    </Container>
  );
};

export default BlogManagement;
