import React, { Component } from 'react';
import _map from 'lodash/map';
import _uniq from 'lodash/uniq';
import _cloneDeep from 'lodash/cloneDeep';
import FontOptionContainer from './../FontOptionContainer';
import TextBox from './../TextBox';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      googleFonts: [],
      availableCategories: [],
      availableFontFamilies: [],

      fontFamailesForSelectedCatagory: [],
      variantForSelectedFonts: [],
      fontCatogrySelection: "",
      fontFamilySelection: "",
      variantSelection: ""
    }

    this.handleClickOnCategory = this.handleClickOnCategory.bind(this);
    this.handleChangeFontFamily = this.handleChangeFontFamily.bind(this);
  }

  componentDidMount() {
    fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDUYZ9Phtnc_OpfFd39Ri-eQoxbfvcwUeA')
      .then(res => res.json())
      .then((fonts) => {
        let fontsObject = {};
        let propertiesToBeDeleted = ["kind", "subsets", "version", "lastModified", "files"];
        let category = "";
        let categoryArray = ["All Category"];

        fonts.items.map((font) => {
          propertiesToBeDeleted.map((d) => delete font[d]);
          category = font.category;
          categoryArray.push(category);

          fontsObject[category] ? fontsObject[category].push({ ...font }) : fontsObject[category] = [{ ...font }]
          return fontsObject;
        })
        this.setState({
          googleFonts: fontsObject,
          availableCategories: this.__mappedCategoryArray(categoryArray),
          availableFontFamilies: this.__getFontsCategorySpecific("All Category")
        })
      });
  }

  __getFontsCategorySpecific(categoryName) {
    return categoryName === "All Category" ? "" : this.state.googleFonts[categoryName].map((f)=>{
      return({
        value: f.family,
        label: f.family
      })
    })
  }

  __mappedCategoryArray(arr) {
    let uniqValues = _uniq(arr);
    return uniqValues.map((val) => {
      return ({
        name: val,
        isActive: val === "All Category" ? true : false,
        handleClickOnCategory: this.handleClickOnCategory,
      })
    })
  }

  handleClickOnCategory(event) {
    let categoryName = event.target.dataset.category;
    let availableCategories = _cloneDeep(this.state.availableCategories)
    availableCategories.map((category) => {
      category.isActive = category.name === categoryName ? true : false;
    });
    this.setState({ 
      availableCategories,
      availableFontFamilies: this.__getFontsCategorySpecific(categoryName)
    })
  }

  handleChangeFontFamily(selectFontFamily) {
    console.log(selectFontFamily)
  }

  /*handleChangeFontCatogry(event) {
    this.setState({
      fontCatogrySelection: event.target.value,
      fontFamailesForSelectedCatagory: this.state.googleFonts[event.target.value]
    });
  }

  _getVariants(fontFamily) {
    return this.state.fontFamailesForSelectedCatagory.filter(x => x.family === fontFamily)[0].variants;
  }

  handleChangeFontFamily(event) {
    this.setState({
      fontFamilySelection: event.target.value,
      variantForSelectedFonts: this._getVariants(event.target.value)
    });
  }*/

  render() {
    return (
      <div className="App">
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
              href=""
              target="_blank"
              rel="noopener noreferrer"
              title="Pankaj Ladhar github profile ">
              <i className="fa fa-github"></i>
            </a>
          </div>
        </header>
        <section className="Wrapper">
          <FontOptionContainer 
            categories={this.state.availableCategories}
            fontFamilies={this.state.availableFontFamilies}
            handleChangeFontFamily={this.handleChangeFontFamily}
          />
          {/* <TextBox /> */}
        </section>
      </div>
    );
  }
}

export default App;
