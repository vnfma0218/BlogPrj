import React from 'react';
import ArticleItem from './ArticleItem';
import { Link } from 'react-router-dom';

import './ArticleList.css';

const ArticleList = ({ articles, onDelete, loadingState }) => {
  if (loadingState) {
    return <h1>Loading..</h1>;
  }
  if (articles.length === 0) {
    return (
      <>
        <h1 className='noArticle_title'>no found articles</h1>
        <h3>You want to create one?</h3>
        <Link to='/new'>
          <button className='newArticle_btn newBtn'>New Article</button>
        </Link>
      </>
    );
  }
  return (
    <>
      <div className='acticleList'>
        <div className='articleList_top'>
          <h1 className='articleList_title'>Articles</h1>
          <Link to='/new'>
            <button className='newArticle_btn newBtn'>New Article</button>
          </Link>
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
