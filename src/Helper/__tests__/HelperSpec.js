let helper = require('./../index');

describe("Helper", ()=>{
    it('should return proper fontWeight and fontStyle object', () =>{
        let obj_with_regular = helper.getFontWeightAndSyle("regular");
        expect(obj_with_regular.fontWeight).toEqual(400);
        expect(obj_with_regular.fontStyle).toEqual("normal");

        let obj_with_Regular = helper.getFontWeightAndSyle("Regular");
        expect(obj_with_Regular.fontWeight).toEqual(400);
        expect(obj_with_Regular.fontStyle).toEqual("normal");

        let obj_with_400 = helper.getFontWeightAndSyle("400");
        expect(obj_with_400.fontWeight).toEqual("400");
        expect(obj_with_400.fontStyle).toEqual("normal");

        let obj_with_700 = helper.getFontWeightAndSyle("700");
        expect(obj_with_700.fontWeight).toEqual("700");
        expect(obj_with_700.fontStyle).toEqual("normal");

        let obj_with_italic = helper.getFontWeightAndSyle("italic");
        expect(obj_with_italic.fontWeight).toEqual(400);
        expect(obj_with_italic.fontStyle).toEqual("italic");

        let obj_with_700italic = helper.getFontWeightAndSyle("700italic");
        expect(obj_with_700italic.fontWeight).toEqual("700");
        expect(obj_with_700italic.fontStyle).toEqual("italic");
    })
})