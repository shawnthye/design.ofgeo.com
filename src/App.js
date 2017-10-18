import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Home from './home/index'
import NotFound from './notfound'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    {/*<Route path="/about" component={About}/>*/}
                    {/*<Route path="/:user" component={User}/>*/}
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
