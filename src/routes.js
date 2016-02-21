import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import CounterPage from './containers/CounterPage'
import GithubPage from './containers/GithubPage'
import GitUserPage from './containers/GitUserPage'
import RepoPage from './containers/RepoPage'
import Notfound from './components/Notfound'

export default (
  <Route path="/" component={App}>
    <Route path="/counter" component={CounterPage} />
    <Route path="/github" component={GithubPage} />
      <Route path="github/:user" component={GitUserPage} />
      <Route path="github/:user/:repo" component={RepoPage} />
    <Route path="*" component={Notfound} />
  </Route>
)
