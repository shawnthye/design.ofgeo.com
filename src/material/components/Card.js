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


import '@material/card/dist/mdc.card.css'

class Card extends PureComponent {
    static propTypes = {
        id: PropTypes.string,
        elevation: PropTypes.number,
    };

    static defaultProps = {
        // open: true,
    };

    constructor(props){
        super(props);

    }

    render() {
        // Within render, we generate the html needed to render a proper MDC-Web drawer.
        return (
            <div className={`mdc-card ${this.props.className}`}>
                {this.props.children}
            </div>
        );
    }
}

export default Card