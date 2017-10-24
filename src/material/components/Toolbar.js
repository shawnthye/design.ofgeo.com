/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable */

/**
 * @fileoverview This file shows how you can easily integrate MDC-Web components into React, using
 * checkbox as an example. Within the constructor, a foundation is initialized and given an adapter that
 * allows it to perform UI operations in a way idiomatic to React.
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Set as ImmutableSet} from 'immutable';
import {MDCToolbarFoundation} from '@material/toolbar';

import '@material/toolbar/dist/mdc.toolbar.css';
import '@material/elevation/dist/mdc.elevation.css';

class Toolbar extends PureComponent {
    static propTypes = {
        id: PropTypes.string,
        title: PropTypes.string,
        elevation: PropTypes.number,
    };

    static defaultProps = {
        title: null,
        elevation: 4,
    };

    state = {
        classes: new ImmutableSet()
    };

    // Here we initialize a foundation class, passing it an adapter which tells it how to
    // work with the React component in an idiomatic way.
    foundation = new MDCToolbarFoundation({
        addClass: className => this.setState(prevState => ({
            classes: prevState.classes.add(className)
        })),
        removeClass: className => this.setState(prevState => ({
            classes: prevState.classes.remove(className)
        })),
        // hasClass: className => {
        //     return this.state.classes.contains(className) || (this && this.refs.drawer.classList.contains(className));
        // },
        hasNecessaryDom: () => {
            return Boolean(this.refs.drawer)
        },
        registerInteractionHandler: (evtType, handler) => {
            addEventListener(evtType, handler);
        },
        deregisterInteractionHandler: (evtType, handler) => {
            removeEventListener(evtType, handler);
        },
        registerDrawerInteractionHandler: (evtType, handler) => {
            this.refs.drawer.addEventListener(evtType, handler);
        },
        // registerInteractionHandler: (evtType, handler) => {
        //     this.refs.drawer.addEventListener(evtType, handler);
        // },
        // registerInteractionHandler: (evtType, handler) => {
        //     this.refs.drawer.addEventListener(evtType, handler);
        // },
        getDrawerWidth() {
            return this.refs.drawer.clientWidth;
        }
    });

    render() {
        // Within render, we generate the html needed to render a proper MDC-Web drawer.
        return (
            <header
                className={`mdc-toolbar mdc-elevation--z${this.props.elevation} ${this.state.classes.toJS().join(' ')}`}>
                <div className="mdc-toolbar__row">
                    <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
                        {/*<a className="material-icons mdc-toolbar__menu-icon">menu</a>*/}
                        <span className="mdc-toolbar__title">{this.props.title}</span>
                    </section>
                </div>
            </header>
            //         <aside class="mdc-temporary-drawer mdc-typography">
            //         <nav class="mdc-temporary-drawer__drawer">
            //         <header class="mdc-temporary-drawer__header">
            //         <div class="mdc-temporary-drawer__header-content">
            //         Header here
            //     </div>
            // </header>
            //     <nav id="icon-with-text-demo" class="mdc-temporary-drawer__content mdc-list">
            //         <a class="mdc-list-item mdc-temporary-drawer--selected" href="#">
            //             <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">inbox</i>Inbox
            //         </a>
            //         <a class="mdc-list-item" href="#">
            //         <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">star</i>Star
            //     </a>
            // </nav>
            // </nav>
            // </aside>
        );
    }

    componentDidMount() {
        this.foundation.init();
    }

    componentWillUnmount() {
        this.foundation.destroy();
    }

    componentWillReceiveProps(props) {
    }

    // Since we cannot set an indeterminate attribute on a native checkbox, we use componentDidUpdate to update
    // the indeterminate value of the native checkbox whenever a change occurs (as opposed to doing so within
    // render()).
    componentDidUpdate() {
    }
}

export default Toolbar