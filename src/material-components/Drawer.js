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
import {Map as ImmutableMap, Set as ImmutableSet} from 'immutable';
import {getCorrectEventName} from '@material/animation';
import {MDCPersistentDrawerFoundation, MDCPersistentDrawer} from '@material/drawer/persistent';

import '@material/drawer/dist/mdc.drawer.min.css';

function getMatchesProperty(HTMLElementPrototype) {
    return [
        'webkitMatchesSelector', 'msMatchesSelector', 'matches',
    ].filter((p) => p in HTMLElementPrototype).pop();
}

const {ANIM_END_EVENT_NAME} = MDCPersistentDrawerFoundation.strings;

const MATCHES = getMatchesProperty(HTMLElement.prototype);

class Drawer extends PureComponent {
    static propTypes = {
        id: PropTypes.string,
        labelId: PropTypes.string,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        indeterminate: PropTypes.bool,
        onChange: PropTypes.func
    };

    static defaultProps = {
        checked: false,
        disabled: false,
        indeterminate: false,
        onChange: () => {
        }
    };

    state = {
        classes: new ImmutableSet(),
        checkedInternal: this.props.checked,
        disabledInternal: this.props.disabled,
        indeterminateInternal: this.props.indeterminate
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
        registerAnimationEndHandler: handler => {
            if (this.refs.root) {
                this.refs.root.addEventListener(getCorrectEventName(window, 'animationend'), handler);
            }
        },
        deregisterAnimationEndHandler: handler => {
            if (this.refs.root) {
                this.refs.root.removeEventListener(getCorrectEventName(window, 'animationend'), handler)
            }
        },
        registerChangeHandler: handler => {
            // Note that this could also be handled outside of using the native DOM API.
            // For example, onChange within render could delegate to a function which calls
            // the handler passed here, as well as performs the other business logic. The point
            // being our foundations are designed to be adaptable enough to fit the needs of the host
            // platform.
            if (this.refs.nativeCb) {
                this.refs.nativeCb.addEventListener('change', handler);
            }
        },
        deregisterChangeHandler: handler => {
            if (this.refs.nativeCb) {
                this.refs.nativeCb.removeEventListener('change', handler);
            }
        },
        getNativeControl: () => {
            if (!this.refs.nativeCb) {
                throw new Error('Invalid state for operation');
            }
            return this.refs.nativeCb;
        },
        forceLayout: () => {
            if (this.refs.nativeCb) {
                this.refs.nativeCb.offsetWidth;
            }
        },
        isAttachedToDOM: () => Boolean(this.refs.nativeCb),
        attachTo: () => setState()
    });



    changeHandler(evt) {
        this.props.onChange(evt);
    }

    // render() {
    //     // Within render, we generate the html needed to render a proper MDC-Web drawer.
    //     return (
    //
    //     );
    // }

    // Within the two component lifecycle methods below, we invoke the foundation's lifecycle hooks
    // so that proper work can be performed.
    componentDidMount() {


        this.foundation.init();
        this.rippleFoundation.init();
    }

    componentWillUnmount() {
        this.rippleFoundation.destroy();
        this.foundation.destroy();
    }

    // Here we synchronize the internal state of the UI component based on what the user has specified.
    componentWillReceiveProps(props) {
        let drawer = new MDCPersistentDrawer(document.querySelector('.mdc-persistent-drawer'));
        if (props.checked !== this.props.checked) {
            this.setState({checkedInternal: props.checked, indeterminateInternal: false});
        }
        if (props.indeterminate !== this.props.indeterminate) {
            this.setState({indeterminateInternal: props.indeterminate});
        }
        if (props.disabled !== this.props.disabled) {
            this.setState({disabledInternal: props.disabled});
        }
    }

    // Since we cannot set an indeterminate attribute on a native checkbox, we use componentDidUpdate to update
    // the indeterminate value of the native checkbox whenever a change occurs (as opposed to doing so within
    // render()).
    componentDidUpdate() {
        if (this.refs.nativeCb) {
            this.refs.nativeCb.indeterminate = this.state.indeterminateInternal;
        }
        // To make the ripple animation work we update the css properties after React finished building the DOM.
        if (this.refs.root) {
            this.state.rippleCss.forEach((v, k) => {
                this.refs.root.style.setProperty(k, v);
            });
        }
    }
}

export default Drawer