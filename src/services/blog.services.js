import axios from 'axios';


// import process from "process";

// const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';


const API_URL = 'https://limitless-plains-41559.herokuapp.com';
// if(development) {
//   API_URL = 'http://localhost:5000';
// } else {
//   API_URL = 'https://limitless-plains-41559.herokuapp.com';
// }

class BlogService {
  async getBlog(id, setBlogPost, setLoading) {
    setLoading(true);
    const blog = await axios({
      url: `${API_URL}/blog/${id}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ',
      },
      method: 'get',
    });
    setBlogPost(blog.data);
    setLoading(false);
    console.log(blog);
  }

  async getPosts(setPosts, setLoading) {
    setLoading(true);
    try {
      const posts = await axios({
        url: `${API_URL}/blog`,
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ',
        },
        method: 'get',
      });
      setPosts(posts.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  async getAllUserPosts(setPosts, user, setLoading) {
    setLoading(true);
    try {
      console.log(user);
      const posts = await axios({
        url: `${API_URL}/blog/all/${user._id}`,
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ',
        },
        method: 'get',
      });
      setPosts(posts.data);
      setLoading(false);
      console.log(posts.data);
    } catch (err) {
      console.log(err);
    }
  }

  async createBlogPost({ title, content }, setLoading) {
    setLoading(true)
    let token = await localStorage.getItem('user').replace(/^"(.*)"$/, '$1');
    try {
      const result = await axios({
        url: `${API_URL}/blog/create`,
        data: {
          title: title,
          content: content,
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
        method: 'post',
      });
      console.log(result.data);
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  }
  async comment(id, name, content) {
    try {
      const result = await axios({
        url: `${API_URL}/comment`,
        data: {
          id: id,
          name: name,
          content: content,
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer `,
        },
        method: 'post',
      });
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  }
  async deletePost(postId) {
    let token = await localStorage.getItem('user').replace(/^"(.*)"$/, '$1');
    try {
      const result = await axios({
        url: `${API_URL}/blog/${postId}`,
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
        method: 'delete',
      });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
  async editPost(postId, input) {
    let token = await localStorage.getItem('user').replace(/^"(.*)"$/, '$1');
    try {
      const result = await axios({
        url: `${API_URL}/blog/${postId}`,
        data: {
          title: input.title,
          content: input.content,
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
        method: 'put',
      });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new BlogService();
