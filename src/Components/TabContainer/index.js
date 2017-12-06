import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './TabContainer.css';

class TabContainer extends Component {
    render() {
        return (
            <div className="TabContainer">
                <Tabs>
                    <TabList>
                        <Tab>Standard</Tab>
                        <Tab>@Import</Tab>
                    </TabList>

                    <TabPanel>
                        <p className="TabContainer__Tab--Content">
                            <h4>Embed Font</h4>
                            To embed your selected fonts into a webpage, copy this code into the &lt;head&gt; of your HTML document.

                                   <pre>
                                &lt;link href="https://fonts.googleapis.com/css?family=<span className="Text__bold">{this.props.fontName.replace(/\s/g, "+")}</span>" rel="stylesheet"&gt;
                                   </pre>
                        </p>
                        <p className="TabContainer__Tab--Content">
                            <h4>Specify in CSS</h4>
                            Use the following CSS rules to specify these families:
                            <pre>font-family: 'Noto Sans', sans-serif;</pre>
                            <strong>Goolgle Fonts:</strong>
                            <a className="Link" href={`https://fonts.google.com/specimen/${this.props.fontName.replace(/\s/g, "+")}`} target="_blank">
                                https://fonts.google.com/specimen/{this.props.fontName.replace(/\s/g, "+")}
                            </a>
                        </p>

                    </TabPanel>
                    <TabPanel>
                        <p className="TabContainer__Tab--Content">
                            <h4>Embed Font</h4>
                            To embed your selected fonts into a webpage, copy this code into the &lt;head&gt; of your HTML document.

                                    <pre>
                                &lt;style&gt;<br />
                                @import url('https://fonts.googleapis.com/css?family=<span className="Text__bold">{this.props.fontName.replace(/\s/g, "+")}</span>');<br />
                                &lt;/style&gt;
                                    </pre>
                        </p>
                        <p className="TabContainer__Tab--Content">
                            <h4>Specify in CSS</h4>
                            Use the following CSS rules to specify these families:
                                    <pre>font-family: 'Noto Sans', sans-serif;</pre>
                            <strong>Goolgle Fonts:</strong> 
                            <a className="Link" href={`https://fonts.google.com/specimen/${this.props.fontName.replace(/\s/g, "+")}`} target="_blank">
                                https://fonts.google.com/specimen/{this.props.fontName.replace(/\s/g, "+")}
                            </a>
                        </p>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

TabContainer.propTypes = {

};

export default TabContainer;