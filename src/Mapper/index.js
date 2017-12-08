import _uniq from 'lodash/uniq';
import _sortBy from 'lodash/sortBy';
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
    let fontsObject = { "All Category": [] };
    let propertiesToBeDeleted = ["kind", "subsets", "version", "lastModified", "files"];
    let category = "";
    let categoryArray = ["All Category"];
    return fetch(URL)
        .then((res) => {
            return res.json()
        })
        .then((fonts) => {
            fonts.items.map((font) => {
                propertiesToBeDeleted.map((d) => delete font[d]);
                category = font.category;
                categoryArray.push(category)
                fontsObject["All Category"].push(__getMappedValueLabelObj(font));
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

export { fetchGoolgeFonts }