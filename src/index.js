import React from 'react'
import {render} from 'react-dom'
import {Router, hashHistory, IndexRoute, Route} from 'react-router'

import App from './components/App'
import NewsContainer from './components/news_container'
import NewsDetail from './components/news_detail'
import UserCenter from './components/user_center'
import './componentsCss/pc.css'

render(
    (
        <Router history={hashHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={NewsContainer}/>
                <Router path="/news_detail/:id" component={NewsDetail}></Router>
                <Router path="/user_center" component={UserCenter}></Router>
            </Route>
        </Router>
    ),document.getElementById('root')
)