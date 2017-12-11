import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <header className="App__header">
                    <a href="/" className="App__Logo">
                        <span className="App__Logo--First">GFonts</span>
                        <span className="App__Logo--Last">Space</span>
                    </a>
                    <div className="App__SocialIcons">
                        <a className="App__SocialIcons__Link"
                            href="https://www.linkedin.com/in/pankaj-ladhar-51781137/"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Pankaj Ladhar linkedin profile ">
                            <i className="fa fa-linkedin"></i>
                        </a>
                        <a className="App__SocialIcons__Link"
                            href="https://github.com/pankajladhar/GFontsSpace"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Pankaj Ladhar github profile ">
                            <i className="fa fa-github"></i>
                        </a>
                    </div>
                </header>
            </div>
        );
    }
}

Header.propTypes = {

};

export default Header;
