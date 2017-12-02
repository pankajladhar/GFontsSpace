import React, { Component } from 'react';
import logo from './logo.svg';
import _map from 'lodash/map';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      googlefonts: [],
      fontFamailesForSelectedCatagory : [],
      variantForSelectedFonts: [],
      fontCatogrySelection : "",
      fontFamilySelection : "",
      variantSelection: ""
    }
    this.handleChangeFontCatogry = this.handleChangeFontCatogry.bind(this);
    this.handleChangeFontFamily = this.handleChangeFontFamily.bind(this);
  }

  componentDidMount() {
    fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDUYZ9Phtnc_OpfFd39Ri-eQoxbfvcwUeA')
      .then((res) => res.json())
      .then((fonts) => {
        let fontsArray = {};
        fonts.items.map((font) => {
          let objNeedToBeDeleted = ["kind", "subsets", "version", "lastModified", "files"];

          objNeedToBeDeleted.map((d) => delete font[d]);

          let category = font.category;
          if (fontsArray[category]) {
            fontsArray[category].push({ ...font });
          }
          else {
            fontsArray[category] = [{ ...font }]
          }
        })
        this.setState({ googlefonts: fontsArray })
      });
  }

  handleChangeFontCatogry(event){
    this.setState({
      fontCatogrySelection: event.target.value,
      fontFamailesForSelectedCatagory: this.state.googlefonts[event.target.value]
    });
  }
  
  _getVariants(fontFamily) {
    return this.state.fontFamailesForSelectedCatagory.filter(x=> x.family === fontFamily)[0].variants;
  }

  handleChangeFontFamily(event){
    this.setState({
      fontFamilySelection: event.target.value,
      variantForSelectedFonts: this._getVariants(event.target.value)
    });
  }

  render() {
    let fontCatagories = Object.keys(this.state.googlefonts);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <h1>Font Category</h1>
          <select value={this.state.fontCatogrySelection} onChange={this.handleChangeFontCatogry} className="Font-Category-Options">
            {/* <option defaultValue="Select Font Category">Select Font Category</option> */}
            <option value="All Category">All Category</option>
            {
              fontCatagories.map((fontcatogry) => <option key={fontcatogry} value={fontcatogry}>{fontcatogry}</option>)
            }
          </select>
        </div>
        <div className="App-intro">
          <h1>Font Family</h1>
          <select value={this.state.fontFamilySelection} onChange={this.handleChangeFontFamily} className="Font-Category-Options">
            <option defaultValue="Select Font Family">Select Font Family</option>
            {
              this.state.fontFamailesForSelectedCatagory.length > 0 && 
                this.state.fontFamailesForSelectedCatagory.map((fontcatogry, index) => 
                  <option key={`fontcatogry-${index}`} value={fontcatogry.family}>{fontcatogry.family}</option>)
            }
          </select>
        </div>
        <div className="App-intro">
          <h1>Available Variants</h1>
          <select value={this.state.variantSelection} 
            onChange={()=>{}} 
            className="Font-Category-Options" 
            disabled={`${this.state.variantForSelectedFonts.length  > 0 ? "" : "disabled" }`}>
            <option defaultValue="Select Font Variant">Select Font Variant</option>
            {
              this.state.variantForSelectedFonts.length > 0 && 
                this.state.variantForSelectedFonts.map((fontvariant, index) => 
                  <option key={`fontvariant-${index}`} value={fontvariant}>{fontvariant}</option>)
            }
          </select>
        </div>
      </div>
    );
  }
}

export default App;
