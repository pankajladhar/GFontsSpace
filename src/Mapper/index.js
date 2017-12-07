const URL = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDUYZ9Phtnc_OpfFd39Ri-eQoxbfvcwUeA';

let __getMappedValueLabelObj = (obj) => {
    return {
        fontFamily: {
            value: obj.family,
            label: obj.family,
        },
        variants: {
            value: obj.variants,
            label: obj.variants,
        }
    }
}

let fetchGoolgeFonts = () => {
    let fontsObject = { "All Category" : []};
    let propertiesToBeDeleted = ["kind", "subsets", "version", "lastModified", "files"];
    let category = "";
    let categoryArray = [];
    return fetch(URL)
        .then((res) => {
            return res.json()
        })
        .then((fonts) => {
            fonts.items.map((font) => {
                propertiesToBeDeleted.map((d) => delete font[d]);
                category = font.category;
                fontsObject["All Category"].push(__getMappedValueLabelObj(font));
                fontsObject[category] ? fontsObject[category].push(__getMappedValueLabelObj(font)) : fontsObject[category] = [__getMappedValueLabelObj(font)]
            });

            return fontsObject
        })
}

export { fetchGoolgeFonts }