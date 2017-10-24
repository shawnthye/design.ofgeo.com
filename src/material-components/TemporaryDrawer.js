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
import {MDCTemporaryDrawerFoundation} from '@material/drawer/temporary';

import '@material/drawer/dist/mdc.drawer.css';
import '@material/list/dist/mdc.list.css'

class TemporaryDrawer extends PureComponent {
    static propTypes = {
        id: PropTypes.string,
        // open: PropTypes.bool,
    };

    static defaultProps = {
        // open: true,
    };

    state = {
        classes: new ImmutableSet(),
        open: this.props.open
    };

    // Here we initialize a foundation class, passing it an adapter which tells it how to
    // work with the React component in an idiomatic way.
    foundation = new MDCTemporaryDrawerFoundation({
        addClass: className => this.setState(prevState => ({
            classes: prevState.classes.add(className)
        })),
        removeClass: className => this.setState(prevState => ({
            classes: prevState.classes.remove(className)
        })),
        hasClass: className => {
            return this.state.classes.contains(className) || (this && this.refs.drawer.classList.contains(className));
        },
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

            <aside className={`mdc-temporary-drawer mdc-typography ${this.state.classes.toJS().join(' ')}`}
                   ref="drawer">
                <nav className="mdc-temporary-drawer__drawer">
                    <div className="mdc-temporary-drawer__toolbar-spacer"></div>


                    {/*<div className="mdc-temporary-drawer__toolbar-spacer"*/}
                         {/*v-if="$slots['toolbar-spacer'] || toolbarSpacer">*/}
                        {/*<slot name="toolbar-spacer"/>*/}
                    {/*</div>*/}

                    {/*<header className="mdc-temporary-drawer__header" v-if="$slots.header">*/}
                        {/*<slot name="header"/>*/}
                    {/*</header>*/}

                    {this.props.children}
                </nav>
            </aside>
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
        this.foundation.open();
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

export default TemporaryDrawer