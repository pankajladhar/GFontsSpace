import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
import TabContainer from './../index';

describe('TabContainer', () => {
    it('renders correctly', () => {
        let tree = renderer.create(
            <TabContainer fontName="oswald" />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly font-family has space', () => {
        let tree = renderer.create(
            <TabContainer fontName="some font family" />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
