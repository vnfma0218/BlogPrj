import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  // Redirect,
  Switch,
} from 'react-router-dom';
import ArticleList from './articles/ArticleList';
import NewArticle from './articles/Page/NewArticle';
import './App.css';
const articles = [
  {
    id: 1,
    title: 'this is article 1 title',
    createdAt: '2021/6/27',
    content:
      'first article content first article content first article content first article content first article content first article content first article content ',
  },
  {
    id: 2,
    title: 'this is article 2 title',
    createdAt: '2020/6/27',
    content: 'second article content',
  },
  {
    id: 3,
    title: 'this is article 3 title',
    createdAt: '1990/6/27',
    content: 'thrid article content',
  },
];
function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' exact>
            <ArticleList articles={articles} />
          </Route>
          <Route path='/new' exact>
            <NewArticle />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
