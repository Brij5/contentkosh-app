import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { useData } from '../hooks/useData';
import { getBlog } from '../services/blogService';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const BlogContainer = styled.article`
  max-width: 800px;
  margin: 4rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease-out;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.primaryColor};
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryColor}11;
  }

  i {
    font-size: 1.2rem;
  }
`;

const BlogHeader = styled.header`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const BlogTitle = styled.h1`
  color: ${({ theme }) => theme.textColor};
  font-size: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.3;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  color: ${({ theme }) => theme.textColor}99;
  font-size: 0.9rem;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  i {
    color: ${({ theme }) => theme.primaryColor};
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 2rem;
`;

const BlogContent = styled.div`
  color: ${({ theme }) => theme.textColor};
  line-height: 1.8;
  font-size: 1.1rem;

  p {
    margin-bottom: 1.5rem;
  }

  h2 {
    color: ${({ theme }) => theme.primaryColor};
    font-size: 1.8rem;
    margin: 2rem 0 1rem;
  }

  ul,
  ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.primaryColor};
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: ${({ theme }) => theme.textColor}cc;
  }
`;

const ShareSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const ShareTitle = styled.h3`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const ShareButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ShareButton = styled.button`
  background: ${({ theme }) => theme.primaryColor}11;
  color: ${({ theme }) => theme.primaryColor};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryColor};
    color: white;
  }

  i {
    font-size: 1.2rem;
  }
`;

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { data: blog, loading, error } = useData(() => getBlog(id));

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!blog) {
    return <ErrorMessage message="Blog post not found" />;
  }

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this article: ${blog.title}`;

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        );
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(blog.title)}`
        );
        break;
      default:
        navigator.clipboard.writeText(url);
    }
  };

  return (
    <BlogContainer theme={theme}>
      <BackButton onClick={() => navigate(-1)} theme={theme}>
        <i className="fas fa-arrow-left"></i>
        Back to Blogs
      </BackButton>

      <BlogHeader>
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
          <MetaItem theme={theme}>
            <i className="far fa-clock"></i>
            {blog.readTime || '5 min read'}
          </MetaItem>
        </BlogMeta>
      </BlogHeader>

      {blog.imageUrl && <BlogImage src={blog.imageUrl} alt={blog.title} />}

      <BlogContent theme={theme}>{blog.content}</BlogContent>

      <ShareSection>
        <ShareTitle theme={theme}>Share this article</ShareTitle>
        <ShareButtons>
          <ShareButton onClick={() => handleShare('twitter')} theme={theme}>
            <i className="fab fa-twitter"></i>
            Twitter
          </ShareButton>
          <ShareButton onClick={() => handleShare('facebook')} theme={theme}>
            <i className="fab fa-facebook"></i>
            Facebook
          </ShareButton>
          <ShareButton onClick={() => handleShare('linkedin')} theme={theme}>
            <i className="fab fa-linkedin"></i>
            LinkedIn
          </ShareButton>
          <ShareButton onClick={() => handleShare('copy')} theme={theme}>
            <i className="far fa-copy"></i>
            Copy Link
          </ShareButton>
        </ShareButtons>
      </ShareSection>
    </BlogContainer>
  );
};

export default BlogPage;
