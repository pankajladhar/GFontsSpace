import React, { Component } from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import WebFont from'webfontloader';
import './FontOptionContainer.css'

class FontOptionContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            color: {
                r: '241',
                g: '112',
                b: '19',
                a: '1',
            }
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate() {
        WebFont.load({
            google: {
                families: ['Open Sans']
            }
        });
    }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        this.setState({
            color: color.rgb
        })
    };

    render() {

        const styleObj = {
            // fontFamily: "Open sans"
        }

        const styles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <section className="FontOptionContainer">
                <section className="FontOptionContainer__Item">
                    <h4 className="FontOptionContainer__Title">Classification</h4>
                    <ul>
                        <li className="active">All Category</li>
                        <li>Sans Serif</li>
                        <li>Serif</li>
                        <li>Display</li>
                        <li>HandWritting</li>
                        <li>Monospace</li>
                    </ul>
                </section>
                <section className="FontOptionContainer__Item">
                    <h4 className="FontOptionContainer__Title">Propeties</h4>
                    <select>
                        <option defaultValue="Select Font Family">Select Font Family</option>
                    </select>
                    <select>
                        <option defaultValue="Select Font Family">Select Font Variant</option>
                    </select>

                    <div>
                        <div style={styles.swatch} onClick={this.handleClick}>
                            <div style={styles.color} />
                        </div>
                        {this.state.displayColorPicker ? <div style={styles.popover}>
                            <div style={styles.cover} onClick={this.handleClose} />
                            <SketchPicker color={this.state.color} onChange={this.handleChange} />
                        </div> : null}
                    </div>

                    <h1 style={styleObj}>
                        Pankaj
                    </h1>
                </section>
            </section>
        );
    }
}

FontOptionContainer.propTypes = {

};

export default FontOptionContainer;