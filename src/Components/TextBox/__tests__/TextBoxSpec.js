import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { TextBox } from './../index';

describe('TextBox', () => {
    let textBoxProps;
    beforeEach(()=>{
        textBoxProps = {
            fontFamily: "Oswald",
            fontVariant: "Regular",
            fontSize: "40",
            color: {
                r: '0',
                g: '0',
                b: '0',
                a: '1',
              }
        }
    })
    it('renders correctly', () => {
        let tree = renderer.create(
            <TextBox {...textBoxProps} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should toggle isHowToUseTabVisible on how to use btn click', ()=>{
        let wrapper = shallow(<TextBox {...textBoxProps} />);
        let elm = wrapper.find('.HowToUse');
        elm.simulate("click");
        expect(wrapper.instance().state.isHowToUseTabVisible).toBeTruthy()
        elm.simulate("click");
        expect(wrapper.instance().state.isHowToUseTabVisible).toBeFalsy()

    })
});
