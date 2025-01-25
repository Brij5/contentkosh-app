import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiClock, FiUser, FiArrowRight } from 'react-icons/fi';

const SectionContainer = styled.section`
  padding: 6rem 2rem;
  background: ${({ theme }) => theme.background};

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  font-weight: 700;

  span {
    color: ${({ theme }) => theme.primary};
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const BlogGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled(motion.article)`
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

    img {
      transform: scale(1.05);
    }

    .read-more {
      color: ${({ theme }) => theme.primary};
      gap: 0.75rem;
    }
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const BlogTitle = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.75rem;
  font-weight: 600;
  line-height: 1.4;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const BlogExcerpt = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadMore = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
`;

const LoadMoreButton = styled(motion.button)`
  background: transparent;
  color: ${({ theme }) => theme.primary};
  border: 2px solid ${({ theme }) => theme.primary};
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin: 3rem auto 0;
  display: block;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary}10;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const sampleBlogs = [
  {
    id: 1,
    title: 'How AI is Revolutionizing Content Creation',
    excerpt: 'Discover how artificial intelligence is transforming the way we create and manage content in the digital age.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: '5 min read',
    image: '/images/blog-1.jpg'
  },
  {
    id: 2,
    title: 'Best Practices for Content Organization',
    excerpt: 'Learn the most effective strategies for organizing and managing your content library for maximum efficiency.',
    author: 'Michael Chen',
    date: '2024-01-12',
    readTime: '4 min read',
    image: '/images/blog-2.jpg'
  },
  {
    id: 3,
    title: 'The Future of Content Management Systems',
    excerpt: 'Explore the upcoming trends and innovations that will shape the future of content management systems.',
    author: 'Emily Davis',
    date: '2024-01-10',
    readTime: '6 min read',
    image: '/images/blog-3.jpg'
  }
];

const BlogsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBlogs(sampleBlogs);
      setLoading(false);
    }, 1000);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <SectionContainer>
        <SectionContent>
          <SectionHeader>
            <Title>Loading blogs...</Title>
          </SectionHeader>
        </SectionContent>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <SectionContent>
        <SectionHeader>
          <Title
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Latest <span>Insights</span> & Updates
          </Title>
          <Description
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Stay informed with our latest articles, tips, and industry insights.
          </Description>
        </SectionHeader>

        <BlogGrid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ImageContainer>
                <img src={blog.image} alt={blog.title} loading="lazy" />
              </ImageContainer>
              <Content>
                <BlogMeta>
                  <MetaItem>
                    <FiUser />
                    {blog.author}
                  </MetaItem>
                  <MetaItem>
                    <FiClock />
                    {blog.readTime}
                  </MetaItem>
                </BlogMeta>
                <BlogTitle>{blog.title}</BlogTitle>
                <BlogExcerpt>{blog.excerpt}</BlogExcerpt>
                <ReadMore className="read-more">
                  Read More <FiArrowRight />
                </ReadMore>
              </Content>
            </BlogCard>
          ))}
        </BlogGrid>

        <LoadMoreButton
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Load More Articles
        </LoadMoreButton>
      </SectionContent>
    </SectionContainer>
  );
};

export default BlogsSection; 