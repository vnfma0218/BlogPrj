import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/use-http';

const ArticleDetail = (props) => {
  const articleId = useParams().articleId;
  const [loadedArticle, setLoadedArticle] = useState({});
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
  console.log(loadedArticle);
  return (
    <div className='article_detail'>
      <h1 className='title'>{loadedArticle.title}</h1>
      <p className='content'>{loadedArticle.content}</p>
    </div>
  );
};

export default ArticleDetail;
