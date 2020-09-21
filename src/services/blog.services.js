import axios from 'axios';

const API_URL
if (NODE_ENV === 'development') {
  API_URL = 'http://localhost:5000';
} else {
  API_URL = 'https://limitless-plains-41559.herokuapp.com';
}

class BlogService {
  async getBlog(id, setBlogPost) {
    const blog = await axios({
      url: `${API_URL}/blog/${id}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ',
      },
      method: 'get',
    })
      setBlogPost(blog.data);
      console.log(blog)
    ;
  }

  async getPosts(setPosts) {
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
      console.log(posts.data);
    } catch (err) {
      console.log(err);
    }
  }

  async getAllUserPosts(setPosts,user) {
      try {
        console.log(user)
      const posts = await axios({
        url: `${API_URL}/blog/all/${user._id}`,
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ',
        },
        method: 'get',
      });
      setPosts(posts.data);
      console.log(posts.data);
    } catch (err) {
      console.log(err);
    }
  }

  async createBlogPost({ title, content }) {
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
    } catch (err) {
      console.log(err);
    }
  }
  async comment(id, name, content ) {
    try {
      const result = await axios({
        url: `${API_URL}/comment`,
        data: {
          id:id,
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
  async deletePost(postId ) {
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
  async editPost(postId,input) {
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
