import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogService from '../../services/blog.services';
import AdminCard from '../../components/adminCard/adminCard.component';
import './dashboard.styles.scss';
import Spinner from '../../components/spinner/spinner.component';


const Dashboard = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    BlogService.getAllUserPosts(setPosts, user, setLoading);
  }, [user]);
  return (
    <div className="dashboard">
      <h1 style={{ textAlign: 'center' }}>DASHBOARD</h1>
      {loading === true ? (
        <Spinner />
      ) : (
        posts.map((post) => {
          return (
            <AdminCard
              to={`blog/${post._id}`}
              admin={true}
              key={post._id}
              post={post}
            />
          );
        })
      )}
      <Link className="link add" to="blog/create">
        Add new Blog post
      </Link>
    </div>
  );
};

export default Dashboard;
