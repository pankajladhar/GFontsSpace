import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';

import { FontOptionContainer } from './../index';

describe('FontOptionContainer', () => {
    it('renders correctly', () => {
        const fontOptionContainerProps = 
        {
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
                    availableFontFamilies:[
                        {
                            value :"some font",
                            label :"some font",
                        }
                    ],
                    availableFontVariants: [
                        {
                            value :"some variants",
                            label :"some variants",
                        }
                    ],
                }
            ],
            showLoader: false,
            userSelectedTextBox: 0,
            availableCategories: [],
            fonts: [],
        }

        let tree = renderer.create(
            <FontOptionContainer {...fontOptionContainerProps}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
