import '@material/theme/dist/mdc.theme.css'
import '@material/typography/dist/mdc.typography.css'

import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'

import Home from './home'
import NotFound from './notfound/NotFound'

import MaterialComponents from './material/Material'


class App extends Component {
    render() {
        return (
            <Switch>
                <Redirect exact from="/" to='/material-components'/>
                <Route exact path="/" component={Home}/>
                <Route path="/material-components" component={MaterialComponents}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        );
    }
}

export default App;
