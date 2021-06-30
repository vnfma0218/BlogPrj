import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import ArticleList from './articles/ArticleList';
import NewArticle from './articles/Page/NewArticle';
import ArticleDetail from './articles/Page/ArticleDetail';
import './App.css';
import EditArticle from './articles/Page/EditArticle';
import axios from 'axios';

function App() {
  const [loadedArticles, setLoadedArticles] = useState([]);
  const fetchUrl = 'http://localhost:5000/api/articles';

  useEffect(() => {
    console.log('home render');
    const fetchArticles = async () => {
      const result = await axios.get(fetchUrl);
      setLoadedArticles(result.data.articles);
    };
    fetchArticles();
  }, [fetchUrl]);

  const addArticleHandler = (newArticle) => {
    setLoadedArticles(loadedArticles.concat(newArticle));
  };

  const deleteArticleHandler = (id) => {
    setLoadedArticles(loadedArticles.filter((article) => article.id !== id));
  };

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' exact>
            <ArticleList
              articles={loadedArticles}
              onDelete={deleteArticleHandler}
            />
          </Route>
          <Route path='/new' exact>
            <NewArticle onAddArticle={addArticleHandler} />
          </Route>
          <Route path='/detail' exact>
            <ArticleDetail />
          </Route>
          <Route path='/edit/:articleId' exact>
            <EditArticle />
          </Route>
          <Redirect from='*' to='/' />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
