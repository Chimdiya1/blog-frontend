import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogService from '../../services/blog.services';
import AdminCard from '../../components/adminCard/adminCard.component';
import './dashboard.styles.scss';

const Dashboard = ({ user }) => {
  const [posts, setPosts] = useState([]);
  console.log(user);
  useEffect(() => {
    BlogService.getAllUserPosts(setPosts, user);
  }, [user]);
  return (
    <div className='dashboard'>
      <h1 style={{ textAlign: 'center' }}>DASHBOARD</h1>
      {posts.map((post) => {
        return (
          <AdminCard
            to={`blog/${post._id}`}
            admin={true}
            key={post._id}
            post={post}
            
          />
        );
      })}
      <Link  className="link add" to="blog/create">Add new Blog post</Link>
    </div>
  );
};

export default Dashboard;
