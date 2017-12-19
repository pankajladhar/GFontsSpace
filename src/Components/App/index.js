import React, { Component } from 'react';
import { connect } from 'react-redux';
import _map from 'lodash/map';
import _uniq from 'lodash/uniq';
import _cloneDeep from 'lodash/cloneDeep';
import { fetchGoolgeFonts } from './../../Mapper';

import GFontsAction from './../../Containers/Actions';

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
      textBoxes: [],
      userSelected: [
        {
          isActive: true,
          fontFamily: "Oswald",
          fontVariant: "Regular",
          fontSize: "40",
          value: "",
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
    this.handleClickOnControlBtn = this.handleClickOnControlBtn.bind(this);

    this.handleClickOnTextBox = this.handleClickOnTextBox.bind(this);
  }

  componentDidMount() {
    this.props.fetchData();
  }


  handleClickOnCategory(event) {
    let categoryName = event.target.dataset.category;
    this.props.categoryChange(this.props.fonts, this.props.availableCategories, categoryName)
  }


  __getVariantsFamilySpecific(family) {
    let availableFontVariants = _cloneDeep(this.state.availableFontFamilies);
    return availableFontVariants.filter(x => x.value === family)[0].variants;
  }

  handleClickOnTextBox(value) {
    this.setState({
      userSelectedTextBox: value
    })
  }

  handleChangeFontFamily(selectedFontFamily) {
    this.props.changeFontFamily(selectedFontFamily)
    // let x = _cloneDeep(this.state.textBoxes);
    // x[this.state.selectdTextBox].fontName = selectedFontFamily.value

    // this.setState({
    //   textBoxes: x,
    //   selectedFontFamily: (selectedFontFamily && selectedFontFamily.value) || "Oswald",
    //   availableFontVariants: (selectedFontFamily && this.__getVariantsFamilySpecific(selectedFontFamily.value)) || ""
    // })
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
        {this.props.fonts.length == 0 ? <Loader /> :
          <div className="App">
            <Header />
            <section className="Wrapper">
              <FontOptionContainer />
              <div className="TexBoxContainerWrapper">
                <TextBoxContainer textBoxes={this.props.textBoxOption} />
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


function mapStateToProps(state) {
  return {
    userSelectedTextBox: state.GFontsReducer.userSelectedTextBox,
    textBoxOption: state.GFontsReducer.textBoxOption,
    fonts: state.GFontsReducer.fonts,
    availableCategories: state.GFontsReducer.availableCategories,
    availableFontFamilies: state.GFontsReducer.availableFontFamilies
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => {
      dispatch(GFontsAction.fetchData(dispatch))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
