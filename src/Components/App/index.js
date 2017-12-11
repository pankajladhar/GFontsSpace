import React, { Component, cloneElement } from 'react';
import _map from 'lodash/map';
import _uniq from 'lodash/uniq';
import _cloneDeep from 'lodash/cloneDeep';
import { fetchGoolgeFonts } from './../../Mapper';
import FontOptionContainer from './../FontOptionContainer';
import TextBoxContainer from './../TextBoxContainer';
import TextBox from './../TextBox';
import Loader from './../Loader';
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
      selectdTextBox: 0,
      isHideControl: false,
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
      textBoxes:[]
    }

    this.handleClickOnCategory = this.handleClickOnCategory.bind(this);
    this.handleChangeFontFamily = this.handleChangeFontFamily.bind(this);
    this.handleChangeFontVariant = this.handleChangeFontVariant.bind(this);
    this.handleChangeFontSize = this.handleChangeFontSize.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleClickOnControlBtn = this.handleClickOnControlBtn.bind(this);

    this.handleFocusOnTextBox = this.handleFocusOnTextBox.bind(this);
    this.handleClickOnCompareBtn = this.handleClickOnCompareBtn.bind(this);
  }

  componentDidMount() {
    let x = _cloneDeep(this.state.textBoxes);

    x.push({
      fontName: this.state.selectedFontFamily,
      fontVariant: this.state.selectedFontVariant,
      fontSize:this.state.selectedFontSize,
      color: this.state.foreGroundColor,
      onFocus: this.handleFocusOnTextBox
    });
    
    this.setState({
      textBoxes: x
    });

    fetchGoolgeFonts().then((res) => {
      this.setState({
        googleFonts: res.fonts,
        availableCategories: this.__mappedCategoryArray(res.categories),
        availableFontFamilies: res.fonts["All"]
      })
    });
  }

  handleFocusOnTextBox(value){
    this.setState({
      selectdTextBox: value
    })
  }

  handleClickOnCompareBtn() {
    let x = _cloneDeep(this.state.textBoxes)
    x.push({
      fontName: this.state.selectedFontFamily,
      fontVariant: this.state.selectedFontVariant,
      fontSize:this.state.selectedFontSize,
      color: this.state.foreGroundColor,
      onFocus: this.handleFocusOnTextBox,
    });
    console.log("sds")
    this.setState ({
      textBoxes : x
    })
  }

  __mappedCategoryArray(arr) {
    return arr.map((val) => {
      return ({
        name: val,
        isActive: val === "All" ? true : false,
        handleClickOnCategory: this.handleClickOnCategory,
      })
    })
  }

  handleClickOnCategory(event) {
    let categoryName = event.target.dataset.category;
    let availableCategories = _cloneDeep(this.state.availableCategories);

    availableCategories.map((category) => {
      category.isActive = category.name === categoryName ? true : false;
    });

    this.setState({
      availableCategories,
      availableFontFamilies: this.state.googleFonts[categoryName]
    })
  }

  handleChangeFontFamily(selectedFontFamily) {
    let x = _cloneDeep(this.state.textBoxes);
    x[0].fontName = selectedFontFamily.value
    
    this.setState({
      textBoxes: x,
      selectedFontFamily: (selectedFontFamily && selectedFontFamily.value) || "Oswald",
      availableFontVariants: (selectedFontFamily && this.__getVariantsFamilySpecific(selectedFontFamily.value)) || ""
    })
  }

  __getVariantsFamilySpecific(family) {
    let availableFontVariants = _cloneDeep(this.state.availableFontFamilies);
    return availableFontVariants.filter(x => x.value === family)[0].variants;
  }

  handleChangeFontVariant(selectedFontVariant) {
    let x = _cloneDeep(this.state.textBoxes);
    x[this.state.selectdTextBox].fontVariant = selectedFontVariant.value

    this.setState({
      textBoxes: x,
      selectedFontVariant: selectedFontVariant.value,
    })
  }

  handleChangeColor(color) {
    let x = _cloneDeep(this.state.textBoxes);
    x[this.state.selectdTextBox].color = color.rgb
    this.setState({ 
      foreGroundColor: color.rgb,
      textBoxes: x,
    })
  }

  handleChangeFontSize(selectedFontSize) {
    let x = _cloneDeep(this.state.textBoxes);
    x[this.state.selectdTextBox].fontSize = selectedFontSize
    this.setState({ 
      textBoxes: x,
      selectedFontSize
     })
  }

  handleClickOnControlBtn() {
    this.setState({ isHideControl: !this.state.isHideControl });
  }

  render() {
    return (
      <div className={this.state.isHideControl ? "HideControl" : "ShowControl"}>
        {this.state.googleFonts.length == 0 ? <Loader /> :
          <div className="App">
            <Header />
            <section className="Wrapper">
              <FontOptionContainer
                categories={this.state.availableCategories}
                fontFamilies={this.state.availableFontFamilies}
                handleChangeFontFamily={this.handleChangeFontFamily}
                fontVariants={this.state.availableFontVariants}
                handleChangeFontVariant={this.handleChangeFontVariant}
                handleChangeFontSize={this.handleChangeFontSize}
                color={this.state.foreGroundColor}
                handleChangeColor={this.handleChangeColor}
                bgColor={this.state.backGroundColor}
              />
              <div className="TexBoxContainerWrapper">
                <TextBoxContainer textBoxes={this.state.textBoxes} 
                  handleClickOnCompareBtn={this.handleClickOnCompareBtn}/>
              </div>
              <button type="button"
                onClick={this.handleClickOnControlBtn}
                className="App__Btn">
                {this.state.isHideControl ? "Show Control" : "Hide Control"}
              </button>
            </section>
          </div>
        }
      </div>
    );
  }
}

export default App;
