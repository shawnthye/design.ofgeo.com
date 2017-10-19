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
import {MDCPersistentDrawerFoundation, MDCPersistentDrawer} from '@material/drawer';

import '@material/list/dist/mdc.list.min.css'
import '@material/drawer/dist/mdc.drawer.min.css';

function getMatchesProperty(HTMLElementPrototype) {
    return [
        'webkitMatchesSelector', 'msMatchesSelector', 'matches',
    ].filter((p) => p in HTMLElementPrototype).pop();
}

class Drawer extends PureComponent {
    static propTypes = {
        id: PropTypes.string,
        open: PropTypes.bool,
    };

    static defaultProps = {
        open: true,
    };

    state = {
        classes: new ImmutableSet(),
        open: this.props.open
    };

    // Here we initialize a foundation class, passing it an adapter which tells it how to
    // work with the React component in an idiomatic way.
    foundation = new MDCPersistentDrawerFoundation({
        addClass: className => this.setState(prevState => ({
            classes: prevState.classes.add(className)
        })),
        removeClass: className => this.setState(prevState => ({
            classes: prevState.classes.remove(className)
        })),
        hasClass: className => true,
        hasNecessaryDom: () => {return true},
        forceLayout: () => {
            if (this.refs.root) {
                this.refs.root.offsetWidth;
            }
        },
        isAttachedToDOM: () => Boolean(this.refs.root),
    });

    render() {
        // Within render, we generate the html needed to render a proper MDC-Web drawer.
        return (
            <nav ref="root" className={`mdc-persistent-drawer mdc-typography ${this.state.classes.toJS().join(' ')}`}>
                <div className="mdc-permanent-drawer__toolbar-spacer"/>
                <div className="mdc-permanent-drawer__content">
                    <nav id="icon-with-text-demo" className="mdc-list">
                        <a className="mdc-list-item mdc-permanent-drawer--selected" href="#">
                            <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">inbox</i>Inbox
                        </a>
                        <a className="mdc-list-item" href="#">
                            <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">star</i>Star
                        </a>
                    </nav>
                </div>
            </nav>
        );
    }

    // Within the two component lifecycle methods below, we invoke the foundation's lifecycle hooks
    // so that proper work can be performed.
    componentDidMount() {
        // this.ROOT = this.refs.root;
        // let drawer = new MDCPersistentDrawer(document.querySelector('.mdc-persistent-drawer'));
        this.foundation.init();

    }

    componentWillUnmount() {
        this.foundation.destroy();
    }

    // Here we synchronize the internal state of the UI component based on what the user has specified.
    componentWillReceiveProps(props) {


    }

    // Since we cannot set an indeterminate attribute on a native checkbox, we use componentDidUpdate to update
    // the indeterminate value of the native checkbox whenever a change occurs (as opposed to doing so within
    // render()).
    componentDidUpdate() {
    }
}

export default Drawer