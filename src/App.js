import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Auth from './users/Pages/Auth';
import ArticleList from './articles/components/ArticleList';
import NewArticle from './articles/Page/NewArticle';
import ArticleDetail from './articles/components/ArticleDetail';
import './App.css';
import EditArticle from './articles/Page/EditArticle';
import SignUp from './users/Pages/SignUp';
import Users from './users/Pages/Users';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Auth />
          </Route>
          <Route path='/users/sign-up' exact>
            <SignUp />
          </Route>
          <Route path='/users' exact>
            <Users />
          </Route>
          <Route path='/articles' exact>
            <ArticleList />
          </Route>
          <Route path='/new' exact>
            <NewArticle />
          </Route>
          <Route path='/detail/:articleId' exact>
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
