import React from 'react';
import './adminCard.styles.scss';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import BlogService from '../../services/blog.services';

const AdminCard = ({ post }) => {
  return (
    <div
      className=" admin-card"
      style={{ display: 'block' }}
      to={`blog/${post._id}`}
      key={post._id}
    >
      <h2>{post.title}</h2>
      <div className="info">
        <p>
          {' '}
          {post.comments.length === 1
            ? post.comments.length + ' Comment'
            : post.comments.length + ' Comments'}{' '}
        </p>
        <p className="date">
          {' '}
          <Moment format="MMM Do YY" date={post.timeStamp} />
        </p>
      </div>
      <div className="change">
        <Link
          className="link edit"
          style={{ display: 'block' }}
          to={`blog/edit/${post._id}`}
        >
          Edit
        </Link>
        <p
          className="delete"
          onClick={() => {
            BlogService.deletePost(post._id);
            window.location.reload();
          }}
        >
          DELETE
        </p>
      </div>
    </div>
  );
};

export default AdminCard;
