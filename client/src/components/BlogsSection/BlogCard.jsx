import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 1rem;
`;

const BlogCard = ({ blog, theme }) => {
  return (
    <Card theme={theme}>
      <a href={blog.link}>
        <Image src={blog.image} alt={blog.title} />
        <Content>
          <Title theme={theme}>{blog.title}</Title>
          <Description theme={theme}>
            {blog.description}
          </Description>
        </Content>
      </a>
    </Card>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  }).isRequired,
  theme: PropTypes.object.isRequired
};

export default BlogCard;
