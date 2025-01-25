import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Editor } from '@tinymce/tinymce-react';
import { FaImage, FaEye, FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
  background: ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return theme.primaryColor;
      case 'secondary':
        return theme.backgroundSecondary;
      case 'danger':
        return '#EF4444';
      default:
        return theme.backgroundSecondary;
    }
  }};
  color: ${({ variant }) => (variant === 'secondary' ? 'inherit' : 'white')};

  &:hover {
    opacity: 0.9;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 24px;
`;

const FormSection = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 20px;
  font-size: 18px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 6px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 6px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 6px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

const ImageUploadContainer = styled.div`
  border: 2px dashed ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.primaryColor};
    background: ${({ theme }) => theme.backgroundHover};
  }
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PreviewModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PreviewContent = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  border-radius: 12px;
  overflow-y: auto;
  padding: 30px;
`;

const TagInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 6px;
  background: ${({ theme }) => theme.inputBackground};
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.primaryColor};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;

  button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
`;

const TagInputField = styled.input`
  border: none;
  background: none;
  padding: 4px;
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;
  flex: 1;
  min-width: 120px;

  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 14px;
  margin-top: 4px;
`;

const BlogForm = ({ blogId, onSubmit }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    imageUrl: '',
    status: 'draft',
    tags: [],
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: '',
      canonicalUrl: ''
    }
  });

  const fetchBlogPost = useCallback(async () => {
    if (!blogId) return;
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/blogs/${blogId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch blog post');
      }

      setFormData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [blogId]);

  useEffect(() => {
    fetchBlogPost();
  }, [fetchBlogPost]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('seo.')) {
      const seoField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        seo: {
          ...prev.seo,
          [seoField]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
        e.target.value = '';
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/blogs${id ? `/${id}` : ''}`, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save blog post');
      }

      navigate('/admin/blogs');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Header>
        <Title>{id ? 'Edit Blog Post' : 'Create New Blog Post'}</Title>
        <ButtonGroup>
          <Button variant="secondary" onClick={() => navigate('/admin/blogs')}>
            <FaArrowLeft /> Back
          </Button>
          <Button variant="secondary" onClick={() => setShowPreview(true)}>
            <FaEye /> Preview
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            <FaSave /> {id ? 'Update' : 'Publish'}
          </Button>
        </ButtonGroup>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Basic Information</SectionTitle>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Summary</Label>
            <Textarea
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Featured Image</Label>
            <ImageUploadContainer onClick={() => document.getElementById('imageInput').click()}>
              <FaImage size={24} />
              <p>Click to upload image</p>
              {formData.imageUrl && <ImagePreview src={formData.imageUrl} alt="Preview" />}
            </ImageUploadContainer>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </FormGroup>

          <FormGroup>
            <Label>Status</Label>
            <Select name="status" value={formData.status} onChange={handleInputChange}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Tags</Label>
            <TagInput>
              {formData.tags.map((tag, index) => (
                <Tag key={index}>
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)}>
                    <FaTimes />
                  </button>
                </Tag>
              ))}
              <TagInputField type="text" placeholder="Add tags..." onKeyDown={handleTagKeyDown} />
            </TagInput>
          </FormGroup>
        </FormSection>

        <FormSection>
          <SectionTitle>Content</SectionTitle>
          <Editor
            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
            value={formData.content}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'code',
                'help',
                'wordcount'
              ],
              toolbar:
                'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={handleEditorChange}
          />
        </FormSection>

        <FormSection>
          <SectionTitle>SEO Settings</SectionTitle>
          <FormGroup>
            <Label>Meta Title</Label>
            <Input
              type="text"
              name="seo.metaTitle"
              value={formData.seo.metaTitle}
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Meta Description</Label>
            <Textarea
              name="seo.metaDescription"
              value={formData.seo.metaDescription}
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Keywords</Label>
            <Input
              type="text"
              name="seo.keywords"
              value={formData.seo.keywords}
              onChange={handleInputChange}
              placeholder="Separate keywords with commas"
            />
          </FormGroup>

          <FormGroup>
            <Label>Canonical URL</Label>
            <Input
              type="url"
              name="seo.canonicalUrl"
              value={formData.seo.canonicalUrl}
              onChange={handleInputChange}
            />
          </FormGroup>
        </FormSection>
      </Form>

      {showPreview && (
        <PreviewModal onClick={() => setShowPreview(false)}>
          <PreviewContent onClick={(e) => e.stopPropagation()}>
            <Header>
              <Title>Preview</Title>
              <Button variant="secondary" onClick={() => setShowPreview(false)}>
                <FaTimes /> Close
              </Button>
            </Header>
            <div>
              {formData.imageUrl && <ImagePreview src={formData.imageUrl} alt={formData.title} />}
              <h1>{formData.title}</h1>
              <p>{formData.summary}</p>
              <div dangerouslySetInnerHTML={{ __html: formData.content }} />
            </div>
          </PreviewContent>
        </PreviewModal>
      )}
    </Container>
  );
};

BlogForm.propTypes = {
  blogId: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};

export default BlogForm;
