import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
import Loader from './../index';

describe('ColorPicker', () => {

    it('renders correctly', () => {
        let tree = renderer.create(
            <Loader />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

});
