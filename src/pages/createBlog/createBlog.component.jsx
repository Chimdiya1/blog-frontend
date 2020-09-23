import React, { useState } from 'react';
import BlogService from '../../services/blog.services';
import { Editor } from '@tinymce/tinymce-react';
import './createBlog.styles.scss';

const CreateBlog = ({ user,history }) => {
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);
  const handleEditorChange = (e) => {
    setInput({
      ...input,
      content: e.target.getContent(),
    });
  };

  const handleInputChange = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  const handleSubmit = (e) => {
    e.preventDefault();
    BlogService.createBlogPost(input, setLoading).then(() => {
      history.push('/');
    });
      
  };

  return (
    <div className="create-blog">
      <h2>CREATE BLOGPOST</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <h3>Title</h3>
          <input
            className="title-input"
            required={true}
            type="text"
            name="title"
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group" style={{ width: '100%' }}>
          <h3>Content</h3>
          <Editor
            required
            apiKey="7jad044szb06ppzcv01aj0h8991g7q0frtponvf54wajvoa2"
            name="content"
            initialValue="<p>Initial content</p>"
            init={{
              height: 500,

              menubar: false,
              plugins: [
                'advlist autolink lists link ',
                'charmap  anchor help',
                'searchreplace visualblocks',
                'wordcount',
              ],
              toolbar:
                'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help',
            }}
            onChange={handleEditorChange}
          />
        </div>
        {loading === true ? (
          <div className="loading">Loading...</div>
        ) : (
          <input className="submit" type="submit" value="Submit" />
        )}
      </form>
    </div>
  );
};

export default CreateBlog;
