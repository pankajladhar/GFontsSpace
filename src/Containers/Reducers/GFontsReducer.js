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
        }
    ],
    showLoader: false,
    userSelectedTextBox: 0,
    availableCategories: [],
    availableFontVariants: [],
    fonts: [],
}

export default function GFontsReducer(state = initialState, action) {
    let newState = Object.assign({}, state), temp;
    switch (action.type) {
        case "FETCHED_FONTS":
            newState.userSelectedTextBox = initialState.userSelectedTextBox            
            newState.textBoxOption = initialState.textBoxOption;
            newState.fonts = action.payload.fonts;
            newState.availableCategories = action.payload.availableCategories;
            newState.textBoxOption[0].availableFontFamilies = action.payload.availableFontFamilies;
            break;

        case "CATEGORY_CHANGED":
            temp = _cloneDeep(newState);
            temp.textBoxOption[action.payload.userSelectedTextBox].category = action.payload.selectedCategory
            temp.textBoxOption[action.payload.userSelectedTextBox].availableFontFamilies = action.payload.availableFontFamilies;
            newState = temp;
            break;

        case "FONTFAMLIY_CHANGED":
            temp = _cloneDeep(newState);
            temp.textBoxOption[action.payload.userSelectedTextBox].fontFamily = action.payload.fontFamily;
            temp.availableFontVariants = action.payload.availableFontVariants
            newState = temp;
            break;

        case "TEXTBOX_CHANGED":
            temp = _cloneDeep(newState);
            temp.userSelectedTextBox = action.payload.userSelectedTextBox;
            newState = temp;
            break;

        case "TEXTCOLOR_CHANGED":
            temp = _cloneDeep(newState);
            temp.textBoxOption[action.payload.userSelectedTextBox].color = action.payload.color;
            newState = temp;
            break;

        case "FONTSIZE_CHANGED":
            temp = _cloneDeep(newState);
            temp.textBoxOption[action.payload.userSelectedTextBox].fontSize = action.payload.fontSize;
            newState = temp;
            break;

        case "NEWTEXTBOX_ADDED":
            temp = _cloneDeep(newState);
            temp.textBoxOption.push(initialState.textBoxOption[0])
            temp.textBoxOption.map((element, index) => {
                element.isActive = action.payload.userSelectedTextBox + 1 === index ? true : false
            });
            temp.textBoxOption[action.payload.userSelectedTextBox + 1].isActive = true;
            temp.userSelectedTextBox = action.payload.userSelectedTextBox + 1;
            newState = temp;
            break;
        default:
            break;
    }
    return newState
}