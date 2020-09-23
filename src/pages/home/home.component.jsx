import React, {useState,useEffect} from 'react'
import './home.styles.scss'
import BlogService from '../../services/blog.services'
import BlogCard from '../../components/blogCard/blogCard.component'
import Spinner from '../../components/spinner/spinner.component'
const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
      BlogService.getPosts(setPosts, setLoading);
    }, []);
    return (
      <div className="home" >
        <div className="banner">
          Forget all the noise out there, join our minimalist blog today and do
          exactly want to do, Read and Write!!
        </div>
        <h2>Explore</h2>
        {
          loading === true ? <Spinner /> : posts.length>=1?posts.map((post) => {
          return (
            <BlogCard to={`blog/${post._id}`} key={post._id} post={post} />
          );
        }):<h3>No Post</h3>}
      </div>
    );
}
 
export default Home;