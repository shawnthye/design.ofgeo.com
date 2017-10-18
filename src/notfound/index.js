import React, {Component} from 'react';
import logo from './logo.svg';
import './style.css';

class NotFound extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">404</h1>
                </header>
                <p className="App-intro">
                    Not Found :(
                </p>
            </div>
        );
    }
}

export default NotFound;
