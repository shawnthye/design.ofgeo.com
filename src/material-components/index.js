import React, {Component} from 'react';
import {Router, Redirect, Route, Switch} from 'react-router-dom'
import Home from '../home'
import NotFound from '../notfound'

import './style.css';
import '@material/list/dist/mdc.list.css'
import '@material/drawer/dist/mdc.drawer.css'
// import TemporaryDrawer from "./TemporaryDrawer";
import PermanentDrawer from "./PermanentDrawer";

class MaterialComponents extends Component {
    render() {
        return (
            <div id="material-components">
                <PermanentDrawer id="drawer">
                    <div className="mdc-list-group">
                        <nav className="mdc-list">
                            <details open>
                                <summary>
                                    <a className="mdc-list-item">
                                        Card
                                    </a>
                                </summary>
                                <a className="mdc-list-item mdc-permanent-drawer--selected" href="#cards">
                                    <i className="material-icons mdc-list-item__start-detail">dashboard</i>Cards
                                </a>
                                <a className="mdc-list-item" href="#radio-buttons">
                                    <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">radio_button_checked</i>Radio
                                    Buttons
                                </a>
                            </details>
                        </nav>
                    </div>
                </PermanentDrawer>
                <div id="content">
                    <Route path="/material-components" component={MaterialComponents}>
                        <Route path="/cards" component={Home}/>
                    </Route>
                </div>

                {/*<Router>*/}
                {/*<Switch>*/}
                {/*<Route exact component={Home}/>*/}

                {/*</Switch>*/}
                {/*</Router>*/}
            </div>
        );
    }
}


// const checkbox = new Checkbox();
// const drawer = new Drawer(document.getElementById('drawer'));
//Drawer.attachTo(document.getElementById('drawer'));

export default MaterialComponents;
