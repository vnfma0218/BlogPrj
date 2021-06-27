import React from 'react';
import ArticleItem from './ArticleItem';
import { Link } from 'react-router-dom';

import './ArticleList.css';

const ArticleList = ({ articles }) => {
  return (
    <>
      <div className='acticleList'>
        <div className='articleList_top'>
          <h1 className='articleList_title'>Blog Articles</h1>
          <button className='newArticle_btn'>
            <Link to='/new'>New Article</Link>
          </button>
        </div>
        {articles.map((article) => {
          return (
            <ArticleItem
              key={article.id}
              title={article.title}
              createdAt={article.createdAt}
              content={article.content}
            />
          );
        })}
      </div>
    </>
  );
};

export default ArticleList;
