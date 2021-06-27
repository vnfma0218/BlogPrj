import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './NewArticle.css';
const NewArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onChange = (e) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else if (e.target.name === 'content') {
      setContent(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //DB 저장
    const article = {
      title,
      content,
    };
    console.log(article);
  };

  return (
    <>
      <button>
        <Link to='/'>Home</Link>
      </button>
      <form onSubmit={onSubmit} className='newArticle_container'>
        <label className='article_title'>Title</label>
        <input
          onChange={onChange}
          type='text'
          name='title'
          placeholder='write the title'
        />
        <label>Content</label>
        <textarea
          onChange={onChange}
          type='text'
          rows='5'
          cols='33'
          name='content'
        ></textarea>
        <button>Submit</button>
      </form>
    </>
  );
};

export default NewArticle;
