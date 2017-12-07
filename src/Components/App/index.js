import React, { Component } from 'react';
import _map from 'lodash/map';
import _uniq from 'lodash/uniq';
import _cloneDeep from 'lodash/cloneDeep';
import { fetchGoolgeFonts } from './../../Mapper';
import FontOptionContainer from './../FontOptionContainer';
import TextBox from './../TextBox';
import Header from './../Header';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      googleFonts: [],
      availableCategories: [],
      availableFontFamilies: [],
      availableFontVariants: [],
      selectedFontFamily: "Oswald",
      selectedFontVariant: "Regular",
      selectedFontSize: "40",
      foreGroundColor: {
        r: '0',
        g: '0',
        b: '0',
        a: '1',
      },
      backGroundColor: {
        r: '255',
        g: '255',
        b: '255',
        a: '1',
      },
    }

    this.handleClickOnCategory = this.handleClickOnCategory.bind(this);
    this.handleChangeFontFamily = this.handleChangeFontFamily.bind(this);
    this.handleChangeFontVariant = this.handleChangeFontVariant.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
  }

  componentDidMount() {

    fetchGoolgeFonts().then((x)=>{
      console.log(x)
    })

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

  __getFontsCategorySpecific(categoryName) {
    return categoryName === "All Category" ? "" : this.state.googleFonts[categoryName].map((f) => {
      return ({
        value: f.family,
        label: f.family,
        variants: f.variants
      })
    })
  }

  __getVariantsFamilySpecific(family) {
    let availableFontVariants = _cloneDeep(this.state.availableFontFamilies)
    let filteredVariants = availableFontVariants.filter(x => x.value === family)[0].variants;
    let mappedVariants = filteredVariants.map((v) => {
      return ({
        value: v,
        label: v
      })
    })
    return mappedVariants
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

  handleChangeFontFamily(selectedFontFamily) {
    this.setState({
      selectedFontFamily: (selectedFontFamily && selectedFontFamily.value) || "Oswald",
      availableFontVariants: selectedFontFamily && this.__getVariantsFamilySpecific(selectedFontFamily.value)
    })
  }

  handleChangeFontVariant(selectedFontVariant) {
    this.setState({
      selectedFontVariant: (selectedFontVariant && selectedFontVariant.value) || "Regular",
    })
  }

  handleChangeColor(color) {

    console.log("sdds",color)
    this.setState({ foreGroundColor: color.rgb })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <section className="Wrapper">
          <FontOptionContainer
            categories={this.state.availableCategories}
            fontFamilies={this.state.availableFontFamilies}
            handleChangeFontFamily={this.handleChangeFontFamily}
            fontVariants={this.state.availableFontVariants}
            handleChangeFontVariant={this.handleChangeFontVariant}
            color={this.state.foreGroundColor}
            handleChangeColor={this.handleChangeColor}
            bgColor={this.state.backGroundColor}
          />
          <div className="TexBoxContainer">
            <TextBox fontName={this.state.selectedFontFamily}
              fontVariant={this.state.selectedFontVariant}
              fontSize={this.state.selectedFontSize}
              color={this.state.foreGroundColor} />
            {/* <TextBox /> */}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
