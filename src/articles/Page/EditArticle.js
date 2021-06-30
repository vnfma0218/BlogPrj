import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import './EditArticle.css';

const EditArticle = ({ onEditArticle }) => {
  const articleId = useParams().articleId;
  const history = useHistory();
  const [loadedArticle, setLoadedArticle] = useState({});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    console.log('home render');
    const fetchArticles = async () => {
      const result = await axios(
        `http://localhost:5000/api/articles/${articleId}`
      );
      setLoadedArticle(result.data.article);
      setTitle(result.data.article.title);
      setContent(result.data.article.content);
    };
    fetchArticles();
  }, [articleId]);

  const onChange = (e) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else if (e.target.name === 'content') {
      setContent(e.target.value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //DB 저장
    const article = {
      title,
      content,
    };

    const result = await axios.patch(
      `http://localhost:5000/api/articles/${articleId}`,
      article
    );
    onEditArticle(
      result.data.article._id,
      result.data.article.title,
      result.data.article.content
    );
    history.push('/');
  };

  if (!loadedArticle) return <div>Loading..</div>;

  return (
    <div>
      {loadedArticle && (
        <>
          <Link to='/'>
            <button className='homeBtn'>List</button>
          </Link>
          <form onSubmit={onSubmit} className='newArticle_container'>
            <label className='article_title'>Title</label>
            <input
              className='titleInput'
              onChange={onChange}
              type='text'
              name='title'
              placeholder='write the title'
              defaultValue={loadedArticle.title}
            />
            <label className='article_content'>Content</label>
            <textarea
              className='contentInput'
              onChange={onChange}
              type='text'
              rows='15'
              cols='60'
              name='content'
              defaultValue={loadedArticle.content}
            ></textarea>
            <button className='submitBtn'>Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditArticle;
