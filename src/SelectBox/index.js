import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './SelectBox.css';

const propTypes = {}
const defaultProps = {}

export default class SelectBox extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isSelectBoxOptionsVisible: false,
            btnValue: "Select a Card Type",
            originalList: this.props.options,
            cursor: 0
        };
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.handleOnClickOption = this.handleOnClickOption.bind(this);
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
        this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
    }

    handleOnClick() {
        let oldState = this.state.isSelectBoxOptionsVisible;
        this.setState({
            isSelectBoxOptionsVisible: !oldState
        })
    }

    handleOnBlur() {
        ! this.props.debug && 
        this.setState({
            isSelectBoxOptionsVisible: false
        })
    }

    handleOnClickOption(i) {
        let listItems = this.state.originalList.slice();
        listItems.map((listItem, index) => {
            index === i ? listItem.selected = true : listItem.selected = false;
        })

        setTimeout(() => {
            this.setState({
                originalList: listItems,
                btnValue: listItems[i].title,
                isSelectBoxOptionsVisible: false,
                cursor: this.state.cursor
            })
        }, 0);

        this.props.onChange(listItems[i])
    }

    handleOnKeyDown(e) {
        if (e.keyCode === 38 && this.state.cursor > 0 && this.state.isSelectBoxOptionsVisible) {
            this.setState(prevState => ({
                cursor: prevState.cursor - 1
            }))
        } else if (e.keyCode === 40 && this.state.cursor < this.state.originalList.length - 1) {
            if (!this.state.isSelectBoxOptionsVisible) {
                setTimeout(() => {
                    this.setState({
                        isSelectBoxOptionsVisible: true
                    })
                }, 0);
            }
            else {
                this.setState(prevState => ({
                    cursor: prevState.cursor + 1
                }))
            }
        } else if (e.keyCode === 13) {
            this.state.isSelectBoxOptionsVisible && this.handleOnClickOption(this.state.cursor)
        }
        else if (e.keyCode === 27) {
            let userSelectOptionIndex = 0;
            this.state.originalList.filter((item, index) => {
                if (item.selected) userSelectOptionIndex = index;
            })
            setTimeout(() => {
                this.setState({
                    isSelectBoxOptionsVisible: false,
                    cursor: userSelectOptionIndex
                })
            }, 0);
        }
    }

    handleOnMouseOver(index) {
        this.setState({
            cursor: index
        })
    }

    render() {
        return (
            <div className={"SelectBox " + (this.state.isSelectBoxOptionsVisible ? "showing" : "")}>
                <input type="button"
                    className="button button--secondary"
                    value={this.state.btnValue}
                    onClick={this.handleOnClick}
                    onBlur={this.handleOnBlur}
                    onKeyUp={this.handleOnKeyUp}
                    onKeyDown={this.handleOnKeyDown}
                />

                {this.state.isSelectBoxOptionsVisible && <div className={"SelectBox-options"} role="combobox" aria-expanded={this.state.isSelectBoxOptionsVisible}>
                    <ul role="listbox">
                        <li tabIndex="-1">
                            <span className="SelectBox-options-link not-selectable">Select a Card Type</span>
                        </li>
                        {this.state.originalList.map((option, index) => {
                            return (
                                <li key={index}>
                                    <span
                                        className={`SelectBox-options-link ${option.selected ? "selected" : ""} ${this.state.cursor === index ? 'active' : ''}`}
                                        onClick={() => { { this.handleOnClickOption(index) } }}
                                        tabIndex="-1"
                                        onMouseEnter={() => { this.handleOnMouseOver(index) }}
                                        data-value={JSON.stringify({ value: option.value, title: option.title })}>
                                        {option.iconInfo && <i className={`icon ${option.iconInfo.icon} ${option.iconInfo.alignment}`}></i>}
                                        {option.title}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                }
            </div>
        );
    }
}

SelectBox.propTypes = propTypes;
SelectBox.defaultProps = defaultProps;



