import React from 'react'
import {render} from 'react-dom'
import MediaQuery from 'react-responsive'
import {Router, hashHistory, IndexRoute, Route} from 'react-router'

import App from './components/App'
import NewsContainer from './components/news_container'
import NewsDetail from './components/news_detail'
import UserCenter from './components/user_center'
import './componentsCss/pc.css'

import MobileApp from './components/MobileApp'
import MobileNewsContainer from './components/MobileNewsContainer'
import MobileDetail from './components/MobileDetail'
import MobileUserCenter from './components/MobileUserCenter'
import './componentsCss/mobile.css'

render(
    (<div>
            <MediaQuery query='(min-device-width: 1224px)'>
                <Router history={hashHistory}>
                    <Route path='/' component={App}>
                        <IndexRoute component={NewsContainer}/>
                        <Router path="/news_detail/:uniquekey/:type" component={NewsDetail}></Router>
                        <Router path="/user_center" component={UserCenter}></Router>
                    </Route>
                </Router>
            </MediaQuery>
            <MediaQuery query='(max-device-width: 1224px)'>
                <Router history={hashHistory}>
                    <Route path='/' component={MobileApp}>
                        <IndexRoute component={MobileNewsContainer}/>
                        <Router path="/news_detail/:uniquekey" component={MobileDetail}></Router>
                        <Router path="/user_center" component={MobileUserCenter}></Router>
                    </Route>
                </Router>
            </MediaQuery>
        </div>
    ),document.getElementById('root'))