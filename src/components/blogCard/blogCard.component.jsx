import React from 'react';
import './blogCard.styles.scss';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const BlogCard = ({ post }) => {
  return (
    <Link
      className="link blog-card"
      to={`blog/${post._id}`}
      key={post._id}
    >
      <h2>{post.title}</h2>
      <div className="info">
        <p className="author">{post.author.username}</p>
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
    </Link>
  );
};

export default BlogCard;
