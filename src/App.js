import '@material/theme/dist/mdc.theme.css'
import '@material/typography/dist/mdc.typography.css'

import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'

import Home from './home'
import NotFound from './notfound'

import MaterialComponents from './material-components'


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch >
                    {/*<Redirect exact from="/" to='/material-components'/>*/}
                    {/*<Route exact path="/" component={Home}/>*/}
                    <Route path="/material-components" component={MaterialComponents}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
