import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CopyContent from './../CopyContent';
import './TabContainer.css';

class TabContainer extends Component {
    constructor(props) {
        super(props);
        this.handleClickOnCopy = this.handleClickOnCopy.bind(this);
    }

    handleClickOnCopy(value) {
        let textField = document.createElement('textarea');
        textField.innerText = value;
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }

    render() {
        return (
            <div className="TabContainer">
                <Tabs>
                    <TabList>
                        <Tab>Standard</Tab>
                        <Tab>@Import</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="TabContainer__Tab--Content">
                            <h4>Embed Font</h4>
                            To embed your selected fonts into a webpage, copy this code into the &lt;head&gt; of your HTML document.

                            <div className="Info-Font">
                                <span>
                                    &lt;link href="https://fonts.googleapis.com/css?family=<span className="Text__bold">{this.props.fontName.replace(/\s/g, "+")}</span>" rel="stylesheet"&gt;
                                </span>
                                <CopyContent
                                    onClick={this.handleClickOnCopy}
                                    content={`<link href="https://fonts.googleapis.com/css?family=${this.props.fontName}" rel="stylesheet">`}
                                />
                            </div>
                        </div>
                        <div className="TabContainer__Tab--Content">
                            <h4>Specify in CSS</h4>
                            Use the following CSS rules to specify these families:
                            <div className="Info-Font">
                                <span>
                                    font-family: {`${this.props.fontName}, sans-serif`};
                                </span>
                                <CopyContent
                                    onClick={this.handleClickOnCopy}
                                    content={`font-family: ${this.props.fontName}, sans-serif;`}
                                />
                            </div>
                            <strong>Goolgle Fonts:</strong>
                            <a className="Link" href={`https://fonts.google.com/specimen/${this.props.fontName.replace(/\s/g, "+")}`} target="_blank">
                                https://fonts.google.com/specimen/{this.props.fontName.replace(/\s/g, "+")}
                            </a>
                        </div>

                    </TabPanel>
                    <TabPanel>
                        <div className="TabContainer__Tab--Content">
                            <h4>Embed Font</h4>
                            To embed your selected fonts into a webpage, copy this code into the &lt;head&gt; of your HTML document.

                            <div className="Info-Font">
                                <span>
                                    &lt;style&gt;<br />
                                    @import url('https://fonts.googleapis.com/css?family=<span className="Text__bold">{this.props.fontName.replace(/\s/g, "+")}</span>');<br />
                                    &lt;/style&gt;
                                </span>
                                <CopyContent
                                    onClick={this.handleClickOnCopy}
                                    content={`<style>@import url('https://fonts.googleapis.com/css?family=${this.props.fontName}");</style>`}
                                />
                            </div>
                        </div>
                        <div className="TabContainer__Tab--Content">
                            <h4>Specify in CSS</h4>
                            Use the following CSS rules to specify these families:
                            <div className="Info-Font">
                                <span>
                                    font-family: {`${this.props.fontName}, sans-serif`};
                                </span>
                                <CopyContent
                                    onClick={this.handleClickOnCopy}
                                    content={`font-family: ${this.props.fontName}, sans-serif;`}
                                />
                            </div>
                            <strong>Goolgle Fonts:</strong>
                            <a className="Link" href={`https://fonts.google.com/specimen/${this.props.fontName.replace(/\s/g, "+")}`} target="_blank">
                                https://fonts.google.com/specimen/{this.props.fontName.replace(/\s/g, "+")}
                            </a>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

TabContainer.propTypes = {

};

export default TabContainer;