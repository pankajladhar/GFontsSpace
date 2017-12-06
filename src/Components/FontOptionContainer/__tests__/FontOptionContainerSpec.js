import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
import FontOptionContainer from './../index';

describe('FontOptionContainer', () => {
    it('renders correctly', () => {
        const fontOptionContainerProp = {
            categories:[{
                name: "sarif",
                isActive: true,
                handleClickOnCategory: jest.fn()
            }],
            fontFamilies:[
                {
                    value :"some font",
                    label :"some font",
                }
            ],
            handleChangeFontFamily:jest.fn(),
            fontVariants:["regular", 400],
            handleChangeFontVariant:jest.fn(),
            color:{
                r: '0',
                g: '0',
                b: '0',
                a: '1',
              },
            handleChangeColor:jest.fn(),
            bgColor:{
                r: '255',
                g: '255',
                b: '255',
                a: '1',
              },
        }
        let tree = renderer.create(
            <FontOptionContainer {...fontOptionContainerProp}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
