import React, { useEffect, useState } from 'react';
import ArticleItem from './ArticleItem';
import { Link } from 'react-router-dom';

import './ArticleList.css';
import useHttp from '../../hooks/use-http';

const ArticleList = () => {
  const [loadedArticles, setLoadedArticles] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    let fetchedArticles = [];
    const getData = ({ data }) => {
      const articleObj = data.articles;

      for (const articleKey in articleObj) {
        fetchedArticles.push({
          id: articleObj[articleKey].id,
          title: articleObj[articleKey].title,
          content: articleObj[articleKey].content,
        });
      }
      setLoadedArticles(fetchedArticles);
    };
    sendRequest(
      { url: 'http://localhost:5000/api/articles', method: 'get' },
      getData
    );
  }, [sendRequest]);

  // const updatedNewArticle = (newArticle) => {
  //   setLoadedArticles(loadedArticles.concat(newArticle));
  // };

  const onDelete = (id) => {
    setLoadedArticles(loadedArticles.filter((article) => article.id !== id));
  };

  // const updateArticle = (updatedEditArticle) => {
  //   const index = loadedArticles.findIndex(
  //     (article) => article.id === updatedEditArticle._id
  //   );

  //   let newArr = [...loadedArticles];
  //   newArr[index] = {
  //     title: updatedEditArticle.title,
  //     content: updatedEditArticle.content,
  //     id: updatedEditArticle._id,
  //   };
  //   setLoadedArticles(newArr);
  // };

  if (error) {
    return <h1>{error}</h1>;
  }
  if (isLoading) {
    return <h1>Loading..</h1>;
  }
  if (loadedArticles.length === 0) {
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
        {loadedArticles.map((article) => {
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
