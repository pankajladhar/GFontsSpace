import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
import TextBox from './../index';

describe('TextBox', () => {
    it('renders correctly', () => {
        const textBoxProps = {
            fontName: "Oswald",
            fontVariant: "Regular",
            fontSize: "40",
            color: {
                r: '0',
                g: '0',
                b: '0',
                a: '1',
              }
        }
        let tree = renderer.create(
            <TextBox {...textBoxProps} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
