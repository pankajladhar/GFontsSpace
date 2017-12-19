import _uniq from 'lodash/uniq';
import _sortBy from 'lodash/sortBy';
import { googleFontResponse } from './../TestData/MockGoogleFontResponse';
const URL = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDUYZ9Phtnc_OpfFd39Ri-eQoxbfvcwUeA';


let __sortArray = (arr, identitiy) =>  _sortBy(arr, (item)=> item.toLowerCase() === identitiy ? 0 : 1 );

let __getMappedVariants = (arr) => {
    let sortedArr = __sortArray(arr, 'regular');
    return sortedArr.map((obj)=>{
        return {
            value: obj,
            label: obj,
        }
    })
}

let __getMappedValueLabelObj = (obj) => {
    return {
        value: obj.family,
        label: obj.family,
        variants: __getMappedVariants(obj.variants)
    }
}

let fetchGoolgeFonts = () => {
    let fontsObject = { "All": [] };
    let propertiesToBeDeleted = ["kind", "subsets", "version", "lastModified", "files"];
    let category = "";
    let categoryArray = ["All"];
    return fetch(URL)
        .then((res) => {
            return res.json()
        })
        .then((fonts) => {
            fonts.items.map((font) => {
                propertiesToBeDeleted.map((d) => delete font[d]);
                category = font.category;
                categoryArray.push(category)
                fontsObject["All"].push(__getMappedValueLabelObj(font));
                fontsObject[category] ? fontsObject[category].push(__getMappedValueLabelObj(font)) : fontsObject[category] = [__getMappedValueLabelObj(font)]
            });

            return (
                {
                    fonts: fontsObject,
                    categories: _uniq(categoryArray)
                }
            )
        })
        .catch(()=>{
            // need to be removed

            let fonts = googleFontResponse;
            fonts.items.map((font) => {
                propertiesToBeDeleted.map((d) => delete font[d]);
                category = font.category;
                categoryArray.push(category)
                fontsObject["All"].push(__getMappedValueLabelObj(font));
                fontsObject[category] ? fontsObject[category].push(__getMappedValueLabelObj(font)) : fontsObject[category] = [__getMappedValueLabelObj(font)]
            });

            return (
                {
                    fonts: fontsObject,
                    categories: _uniq(categoryArray)
                }
            )
        })
}

let mappedCategoryArray = (arr) => {
    return arr.map((val) => {
        return ({
            name: val,
            isActive: val === "All" ? true : false
        })
    });
};

export { fetchGoolgeFonts, mappedCategoryArray }