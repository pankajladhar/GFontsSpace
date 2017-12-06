import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
import ColorPicker from './../index';

describe('ColorPicker', () => {
    const colorPickerProps = {
        r: '0',
        g: '0',
        b: '0',
        a: '1',
    }
    it('renders correctly', () => {
        let tree = renderer.create(
            <ColorPicker color={colorPickerProps} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
