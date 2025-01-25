import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const EditorWrapper = styled.div`
  .tox-tinymce {
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.borderColor};
  }

  .tox-editor-container {
    background: ${({ theme }) => theme.backgroundColor};
  }

  .tox-toolbar {
    background: ${({ theme }) => theme.cardBackground} !important;
  }

  .tox-statusbar {
    background: ${({ theme }) => theme.cardBackground} !important;
  }
`;

const RichTextEditor = ({ value, onChange, theme }) => {
  return (
    <EditorWrapper theme={theme}>
      <Editor
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        value={value}
        onEditorChange={onChange}
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
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 16px; }',
          skin: theme.type === 'dark' ? 'oxide-dark' : 'oxide',
          content_css: theme.type === 'dark' ? 'dark' : 'default'
        }}
      />
    </EditorWrapper>
  );
};

RichTextEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
};

export default RichTextEditor;
