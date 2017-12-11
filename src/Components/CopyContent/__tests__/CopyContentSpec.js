import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import CopyContent from './../index';

describe('CopyContent', () => {
    it('renders correctly', () => {
        const copyContentProps = {
            content: "Some Content",
            onClick: jest.fn()
        }
        let tree = renderer.create(
            <CopyContent {...copyContentProps} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('handleClickMouseLeave should reset titleText state', () => {
        const copyContentProps = {
            content: "Some Content",
            onClick: jest.fn()
        };
        let wrapper = shallow(<CopyContent {...copyContentProps} />);
        wrapper.instance().state.titleText = "Copied";
        wrapper.find('.fa-copy').simulate("mouseleave");
        expect(wrapper.instance().state.titleText).toEqual("Click to Copy")
    });

    it('handleClick should set titleText state', () => {
        let mockClickHandler = jest.fn();
        let mockObject = {
            target: {
                dataset: {
                    item :"Pankaj"
                }
            }
        }
        const copyContentProps = {
            content: "Some Content",
            onClick: mockClickHandler
        };
        let wrapper = shallow(<CopyContent {...copyContentProps} />);
        expect(wrapper.instance().state.titleText).toEqual("Click to Copy")
        wrapper.find('.fa-copy').simulate("click", mockObject);
        expect(mockClickHandler).toHaveBeenCalledWith(mockObject.target.dataset.item)
        expect(wrapper.instance().state.titleText).toEqual("Copied")
    });
});
