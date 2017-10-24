import React, {Component} from 'react';
import Checkbox from './components/Checkbox'

class RatioButtons extends Component {
    render() {
        return (
            <Checkbox/>
        );
    };

    constructor() {
        super();
        document.title = "Ratio Buttons";
    }
}

export default RatioButtons;
