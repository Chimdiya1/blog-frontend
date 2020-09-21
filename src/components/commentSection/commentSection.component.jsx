import React, { useState } from 'react';
import BlogService from '../../services/blog.services';
import './commentSection.styles.scss';
const CommentSection = ({ history, BlogPost }) => {
  const handleInputChange = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  const handleSubmit = (e) => {
    e.preventDefault();
    BlogService.comment(BlogPost._id, input.name, input.content);
    history.go(0);
  };
  const [input, setInput] = useState({});
  return (
    <div className="comments">
      <h3>Comments</h3>
      <div>
        {BlogPost.comments.length >= 1
          ? BlogPost.comments.map((blog) => (
              <div className='comment-block' key={blog.content* Math.random()}>
                <p>{blog.name}</p>
                <p>{blog.content}</p>
              </div>
            ))
          : ''}
      </div>
      <h4>Add Comment</h4>
      <form className="add-comment" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Name</label>
          <input
            className="name"
            required
            type="text"
            name="name"
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label>Comment</label>
          <textarea
            className="content"
            required
            type="text"
            name="content"
            onChange={handleInputChange}
          />
        </div>
        <input className="submit" type="submit" value="COMMENT" />
      </form>
    </div>
  );
};
export default CommentSection;
