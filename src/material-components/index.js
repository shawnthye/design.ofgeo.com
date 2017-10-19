import React, {Component} from 'react';
import './style.css';
import Drawer from "./Drawer";

class MaterialComponents extends Component {
    render() {
        return (
            <div>
                <Drawer/>
            </div>
        );
    }

    componentDidMount() {
        // let aaa =  document.getElementById('checkbox1').checked;
        // document.getElementById('checkbox1').checked = true;
        // Drawer.attachTo(document.getElementById('drawer'))
    };

}


// const checkbox = new Checkbox();
// const drawer = new Drawer(document.getElementById('drawer'));
//Drawer.attachTo(document.getElementById('drawer'));

export default MaterialComponents;
