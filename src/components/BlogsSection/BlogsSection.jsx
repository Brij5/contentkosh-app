import React, { useState } from "react";
import {
  StyledBlogsSection,
  StyledBlogsTitle,
  StyledBlogGrid,
} from "./BlogsSection.styled";
import BlogCard from "./BlogCard";

const BlogsSection = ({ blogs, theme }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs = blogs.filter((blog) => {
    if (selectedCategory === "All") return true;
    return blog.title.includes(selectedCategory);
  });

  return (
    <StyledBlogsSection theme={theme}>
      <StyledBlogsTitle>Our Blogs</StyledBlogsTitle>
      <StyledBlogGrid>
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog.title} blog={blog} theme={theme} />
        ))}
      </StyledBlogGrid>
    </StyledBlogsSection>
  );
};

export default BlogsSection;
