import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './NewArticle.css';
const NewArticle = ({ onAddArticle }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const history = useHistory();

  const onHomeClick = () => {
    history.push('/');
  };

  const onChange = (e) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else if (e.target.name === 'content') {
      setContent(e.target.value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const article = {
      title,
      content,
    };
    await axios.post('http://localhost:5000/api/articles/new', article);
    // const createdArticle = {
    //   title: responseData.data.article.title,
    //   content: responseData.data.article.content,
    //   id: responseData.data.article._id,
    // };

    // onAddArticle(createdArticle);
    history.push('/');
  };

  return (
    <>
      <button className='homeBtn' onClick={onHomeClick}>
        {/* <Link to='/'>Home</Link> */}
        Home
      </button>
      <form onSubmit={onSubmit} className='newArticle_container'>
        <label className='article_title'>Title</label>
        <input
          className='titleInput'
          onChange={onChange}
          type='text'
          name='title'
          placeholder='write the title'
        />
        <label className='article_content'>Content</label>
        <textarea
          className='contentInput'
          onChange={onChange}
          type='text'
          rows='15'
          cols='60'
          placeholder='fill out content '
          name='content'
        ></textarea>
        <button className='submitBtn'>Submit</button>
      </form>
    </>
  );
};

export default NewArticle;
