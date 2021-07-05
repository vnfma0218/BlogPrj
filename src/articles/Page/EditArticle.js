import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import useHttp from '../../hooks/use-http';

import './EditArticle.css';

const EditArticle = ({ onEditArticle }) => {
  const articleId = useParams().articleId;
  const history = useHistory();
  const [loadedArticle, setLoadedArticle] = useState({});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { sendRequest } = useHttp();

  useEffect(() => {
    const getArticle = ({ data }) => {
      setLoadedArticle(data.article);
    };
    sendRequest(
      { url: `http://localhost:5000/api/articles/${articleId}`, method: 'get' },
      getArticle
    );
    return () => setLoadedArticle({});
  }, [articleId, sendRequest]);

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
      title: title === '' ? loadedArticle.title : title,
      content: content === '' ? loadedArticle.content : content,
    };

    // const getData = ({ data }) => {
    //   console.log(data.article);
    //   const updatedarticle = data.article;
    //   // onEditArticle(updatedarticle);
    // };
    sendRequest(
      {
        url: `http://localhost:5000/api/articles/${articleId}`,
        method: 'patch',
        body: article,
      }
      // getData
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
