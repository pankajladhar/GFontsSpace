import _cloneDeep from 'lodash/cloneDeep';

let initialState = {
    textBoxOption: [
        {
            isActive: true,
            fontFamily: "",
            fontVariant: "",
            fontSize: "40",
            value: "",
            color: {
                r: '0',
                g: '0',
                b: '0',
                a: '1',
            },
            category: "All",
            availableFontFamilies:[],
            availableFontVariants: [],
        }
    ],
    showLoader: false,
    userSelectedTextBox: 0,
    availableCategories: [],
    fonts: [],
}

export default function GFontsReducer(state = initialState, action) {
    let newState = _cloneDeep(state);
    switch (action.type) {
        case "FETCHED_FONTS":
            newState.userSelectedTextBox = initialState.userSelectedTextBox            
            newState.textBoxOption = initialState.textBoxOption;
            newState.fonts = action.payload.fonts;
            newState.availableCategories = action.payload.availableCategories;
            newState.textBoxOption[0].availableFontFamilies = action.payload.availableFontFamilies;
            newState.textBoxOption[0].availableFontVariants = initialState.textBoxOption.availableFontVariants;
            break;

        case "CATEGORY_CHANGED":
            newState.textBoxOption[action.payload.userSelectedTextBox].category = action.payload.selectedCategory
            newState.textBoxOption[action.payload.userSelectedTextBox].availableFontFamilies = action.payload.availableFontFamilies;
            break;

        case "FONTFAMLIY_CHANGED":
            newState.textBoxOption[action.payload.userSelectedTextBox].fontFamily = action.payload.fontFamily;
            newState.textBoxOption[action.payload.userSelectedTextBox].availableFontVariants = action.payload.availableFontVariants
            break;
        
        case "FONTVARIANT_CHANGED":
            newState.textBoxOption[action.payload.userSelectedTextBox].fontVariant = action.payload.fontVariant;
            break;

        case "TEXTBOX_CHANGED":
            newState.userSelectedTextBox = action.payload.userSelectedTextBox;
            newState.textBoxOption.map((element, index) => {
                element.isActive = false
            });
            newState.textBoxOption[action.payload.userSelectedTextBox].isActive = true;
            break;

        case "TEXTCOLOR_CHANGED":
            newState.textBoxOption[action.payload.userSelectedTextBox].color = action.payload.color;
            break;

        case "FONTSIZE_CHANGED":
            newState.textBoxOption[action.payload.userSelectedTextBox].fontSize = action.payload.fontSize;
            break;

        case "NEWTEXTBOX_ADDED":
            newState.textBoxOption.push(initialState.textBoxOption[0])
            newState.textBoxOption.map((element, index) => {
                element.isActive = false
            });
            newState.userSelectedTextBox = action.payload.userSelectedTextBox + 1;
            break;
        default:
            break;
    }
    return newState
}