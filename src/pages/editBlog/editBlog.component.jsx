import React, { useState, useEffect } from 'react';
import BlogService from '../../services/blog.services';
import { Editor } from '@tinymce/tinymce-react';
import Spinner from '../../components/spinner/spinner.component';
import './editBlog.styles.scss';

const EditBlog = ({ user, history, match }) => {
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [BlogPost, setBlogPost] = useState({});

  useEffect(() => {
    BlogService.getBlog(match.params.id, setBlogPost, setLoading);
  }, [match.params.id]);

  const handleEditorChange = (e) => {
    setInput({
      ...input,
      content: e.target.getContent(),
    });
    console.log('Content was updated:', e.target.getContent());
  };

  const handleInputChange = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  const handleSubmit = (e) => {
    setSubmitting(true);
    e.preventDefault();
    BlogService.editPost(match.params.id, input).then(() => {
      setSubmitting(false);
      history.push('/');
      history.go(0);
    })
    
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className="create-blog">
        <h2>Edit Blogpost</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <h3>Title</h3>
            <input
              required
              className="title-input"
              type="text"
              name="title"
              defaultValue={BlogPost.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group" style={{ width: '100%' }}>
            <h3>Content</h3>
            <Editor
              apiKey="7jad044szb06ppzcv01aj0h8991g7q0frtponvf54wajvoa2"
              name="content"
              initialValue={BlogPost.content}
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
              onBeforeRenderUI={() => console.log('before')}
            />
          </div>
          {submitting === true ? (
            <div className="loading">Loading...</div>
          ) : (
            <input className="submit" type="submit" value="Edit" />
          )}
        </form>
      </div>
    );
  }
};

export default EditBlog;
