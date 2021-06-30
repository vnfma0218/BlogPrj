import React from 'react';
import ArticleItem from './ArticleItem';
import { Link } from 'react-router-dom';

import './ArticleList.css';

const ArticleList = ({ articles, onDelete }) => {
  if (articles.length === 0) {
    return (
      <>
        <h1 className='noArticle_title'>no found articles</h1>
        <h3>You want to create one?</h3>
        <button className='newArticle_btn newBtn'>
          <Link to='/new'>New Article</Link>
        </button>
      </>
    );
  }
  return (
    <>
      <div className='acticleList'>
        <div className='articleList_top'>
          <h1 className='articleList_title'>Articles</h1>
          <button className='newArticle_btn'>
            <Link to='/new'>New Article</Link>
          </button>
        </div>
        {articles.map((article) => {
          return (
            <ArticleItem
              key={article.id}
              id={article.id}
              title={article.title}
              createdAt={article.createdAt}
              content={article.content}
              onRemove={onDelete}
            />
          );
        })}
      </div>
    </>
  );
};

export default ArticleList;
