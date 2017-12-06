import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
import Header from './../index';

describe('Header', () => {
    it('renders correctly', () => {
        let tree = renderer.create(
            <Header />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
