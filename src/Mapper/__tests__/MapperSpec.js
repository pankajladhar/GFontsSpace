let mapper = require('./../index');
import fetchMock from 'fetch-mock';
import { googleFontResponse } from './../../TestData/MockGoogleFontResponse';

describe("Mapper", ()=>{
    it("should map respose properly", ()=>{
        fetchMock.get('*', googleFontResponse);
        mapper.fetchGoolgeFonts().then((obj)=>{
            expect(obj.categories).toEqual(["All", "sans-serif", "serif", "display"]);
            expect(Object.keys(obj.fonts).length).toEqual(4);
            expect(obj.fonts["handwriting"]).toBeUndefined();
            
            expect(obj.fonts["All"].length).toEqual(8);
            expect(obj.fonts["All"][0]).toEqual({"label": "ABeeZee", "value": "ABeeZee", "variants": [{"label": "regular", "value": "regular"}, {"label": "italic", "value": "italic"}]});

            expect(obj.fonts["sans-serif"].length).toEqual(5);
            expect(obj.fonts["serif"].length).toEqual(2);
            expect(obj.fonts["display"].length).toEqual(1);
        })
    })
})