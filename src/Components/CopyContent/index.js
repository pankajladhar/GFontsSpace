import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CopyContent.css'

class CopyContent extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickMouseLeave = this.handleClickMouseLeave.bind(this);
        this.state = {
            titleText : "Click to Copy"
        }
    }

    handleClick(event) {
        this.props.onClick(event.target.dataset.item);
        this.setState({
            titleText: "Copied"
        });
    }

    handleClickMouseLeave() {
        this.setState({
            titleText: "Click to Copy"
        });
    }

    render() {
        return (
            <div className="CopyContent">
                <i className="fa fa-copy"
                    onClick={this.handleClick}
                    onMouseLeave={this.handleClickMouseLeave}
                    data-item={this.props.content}>
                </i>
                <span className="CopyContent__TitlePopUp">{this.state.titleText}</span>
            </div>
        );
    }
}

CopyContent.propTypes = {
    content: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default CopyContent;