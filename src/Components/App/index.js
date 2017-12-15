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
      backGroundColor: {
        r: '255',
        g: '255',
        b: '255',
        a: '1',
      },
      textBoxes:[],
      userSelected : [
        {
          isActive: true,
          fontFamily: "Oswald",
          fontVariant: "Regular",
          fontSize: "40",
          value:"",
          color: {
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
      ],
      userSelectedTextBox: 0,
    }

    this.handleClickOnCategory = this.handleClickOnCategory.bind(this);
    this.handleChangeFontFamily = this.handleChangeFontFamily.bind(this);
    this.handleChangeFontVariant = this.handleChangeFontVariant.bind(this);
    this.handleChangeFontSize = this.handleChangeFontSize.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleClickOnControlBtn = this.handleClickOnControlBtn.bind(this);

    this.handleClickOnTextBox = this.handleClickOnTextBox.bind(this);
    this.handleClickOnCompareBtn = this.handleClickOnCompareBtn.bind(this);
  }

  componentDidMount() {
    let x = _cloneDeep(this.state.userSelected);
    x[0].onClick = this.handleClickOnTextBox;

    this.setState({
      userSelected: x
    });

    fetchGoolgeFonts().then((res) => {
      this.setState({
        googleFonts: res.fonts,
        availableCategories: this.__mappedCategoryArray(res.categories),
        availableFontFamilies: res.fonts["All"]
      })
    });
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
  
  __getVariantsFamilySpecific(family) {
    let availableFontVariants = _cloneDeep(this.state.availableFontFamilies);
    return availableFontVariants.filter(x => x.value === family)[0].variants;
  }

  handleChangeFontSize(selectedFontSize) {
    let userSelectedClone = _cloneDeep(this.state.userSelected);
    userSelectedClone[this.state.userSelectedTextBox].fontSize = selectedFontSize
    this.setState({
      userSelected : userSelectedClone
    });
  }

  handleChangeColor(color) {
    let userSelectedClone = _cloneDeep(this.state.userSelected);
    userSelectedClone[this.state.userSelectedTextBox].color = color.rgb;

    this.setState({
      userSelected : userSelectedClone
    });

  }

  handleClickOnTextBox(value){
    this.setState({
      userSelectedTextBox : value
    })
  }

  handleClickOnCompareBtn() {

    let x = _cloneDeep(this.state.userSelected);
    // _map(x, (item)=> item.isActive = false)
    x.push(this.state.userSelected[this.state.userSelectedTextBox])
    x[this.state.userSelectedTextBox+1].onClick = this.handleClickOnTextBox;
    // x[this.state.userSelectedTextBox+1].isActive = true;
    this.setState({
      userSelected: x
    });
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
    x[this.state.selectdTextBox].fontName = selectedFontFamily.value
    
    this.setState({
      textBoxes: x,
      selectedFontFamily: (selectedFontFamily && selectedFontFamily.value) || "Oswald",
      availableFontVariants: (selectedFontFamily && this.__getVariantsFamilySpecific(selectedFontFamily.value)) || ""
    })
  }
  
  handleChangeFontVariant(selectedFontVariant) {
    let x = _cloneDeep(this.state.textBoxes);
    x[this.state.selectdTextBox].fontVariant = selectedFontVariant.value

    this.setState({
      textBoxes: x,
      selectedFontVariant: selectedFontVariant.value,
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
                handleChangeColor={this.handleChangeColor}
                fontSize={this.state.userSelected[this.state.userSelectedTextBox].fontSize}
                color={this.state.userSelected[this.state.userSelectedTextBox].color}
                bgColor={this.state.backGroundColor}
              />
              <div className="TexBoxContainerWrapper">
                <TextBoxContainer textBoxes={this.state.userSelected} 
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
