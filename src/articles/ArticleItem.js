import React from 'react';
import './ArticleItem.css';

const ArticleItem = ({ title, content, createdAt }) => {
  return (
    <div className='article_container'>
      <h1>{title}</h1>
      <p>{createdAt}</p>
      <div>{content}</div>
      <div className='article_btns'>
        <button>Read More</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default ArticleItem;
