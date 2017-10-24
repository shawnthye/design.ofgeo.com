import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom'
import PermanentDrawer from "./components/PermanentDrawer";
import Toolbar from "./components/Toolbar";

import Cards from './cards/Cards'
import RatioButtons from "./RatioButtons";
import NotFound from '../notfound/NotFound'

import logo from './logo.svg';
import './Material.css';
import '@material/list/dist/mdc.list.css'
import '@material/drawer/dist/mdc.drawer.css'


class MaterialComponents extends Component {
    render() {
        return (
            <div id="material-components">
                <PermanentDrawer id="drawer">
                    <div className="mdc-permanent-drawer__toolbar-spacer">
                        <img src={logo} className="material-logo" alt="logo"/>
                    </div>
                    <div className="mdc-list-group">
                        <nav className="mdc-list">
                            {/*<details open>*/}
                            {/*<summary>*/}
                            {/*<a className="mdc-list-item">*/}
                            {/*Components*/}
                            {/*</a>*/}
                            {/*</summary>*/}
                            <Link className="mdc-list-item" to={`${this.props.match.url}/cards`}>
                                <i className="material-icons mdc-list-item__start-detail">dashboard</i>Cards
                            </Link>

                            <Link className="mdc-list-item" to={`${this.props.match.url}/ratio-buttons`}>
                                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">radio_button_checked</i>Radio
                                Buttons
                            </Link>
                            {/*</details>*/}
                        </nav>
                    </div>
                </PermanentDrawer>
                <div id="content">
                    <Switch>
                        <Route path={`${this.props.match.url}/cards`}
                               component={() => <Toolbar title="Cards" elevation={0}/>}/>
                        <Route path={`${this.props.match.url}/ratio-buttons`}
                               component={() => <Toolbar title="Ratio Buttons" elevation={0}/>}/>
                    </Switch>


                    <div id="components">
                        <Switch>
                            <Route path={`${this.props.match.url}/cards`} component={Cards}/>
                            <Route path={`${this.props.match.url}/ratio-buttons`} component={RatioButtons}/>
                            <Route path={`${this.props.match.url}/*`} component={NotFound}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}


// const checkbox = new Checkbox();
// const drawer = new Drawer(document.getElementById('drawer'));
//Drawer.attachTo(document.getElementById('drawer'));

export default MaterialComponents;
