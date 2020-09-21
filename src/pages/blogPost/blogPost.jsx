import React, { useEffect, useState } from 'react';
import BlogService from '../../services/blog.services';
import './blogPost.styles.scss';
import Moment from 'react-moment';
import CommentSection from '../../components/commentSection/commentSection.component'
const BlogPost = ({ match,history }) => {
  const [BlogPost, setBlogPost] = useState({ author: {}, content: 'ddd', comments: [] });
  
  const [input, setInput] = useState({});
  
  const avgWordsPerMin = 200;
  function setReadingTime(post) {
    let count = post
      .toString()
      .replace(/(<([^>]+)>)/gi, ' ')
      .match(/\w+/g).length;
    return Math.ceil(count / avgWordsPerMin);
  }
 
  useEffect(() => {
    BlogService.getBlog(match.params.id, setBlogPost);
    console.log(BlogPost);
  }, [match.params.id]);
  return (
    <div className="blog-post">
      <h1>{BlogPost.title}</h1>
      <div className="details">
        <p className="author">By {BlogPost.author.username}</p>
        <Moment className="time" format="MMM Do YY" date={BlogPost.timeStamp} />
        <p className="read-time">
          {setReadingTime(BlogPost.content) === 1
            ? setReadingTime(BlogPost.content) + ' Min read'
            : setReadingTime(BlogPost.content) + ' Min read'}{' '}
        </p>
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: BlogPost.content }}
      ></div>
      <CommentSection BlogPost={BlogPost} history={history}/>
    </div>
  );
};

export default BlogPost;
