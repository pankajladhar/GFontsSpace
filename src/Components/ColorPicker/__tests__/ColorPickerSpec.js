import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { SketchPicker } from 'react-color';
import ColorPicker from './../index';

describe('ColorPicker', () => {
    let colorPickerProps;

    beforeEach(()=>{
        colorPickerProps = {
            r: '0',
            g: '0',
            b: '0',
            a: '1',
        }
    });

    it('renders correctly with color objct', () => {
        let tree = renderer.create(
            <ColorPicker color={colorPickerProps} />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('renders correctly with bgColor objct', () => {
        colorPickerProps.isBackgroundColorPicker = true;
        let tree = renderer.create(
            <ColorPicker color={colorPickerProps} isBackgroundColorPicker/>
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });
    

    it('handleOnClick should toggle displayColorPicker state', () =>{
        let wrapper = shallow(<ColorPicker color={colorPickerProps} />).first().shallow();
        let elem = wrapper.find('.ColorPicker__Swatch');
        elem.simulate("click");
        expect(wrapper.instance().state.displayColorPicker).toBeTruthy()
        elem.simulate("click");
        expect(wrapper.instance().state.displayColorPicker).toBeFalsy()
    });

    it('handleOnChange should set body bg if isBackgroundColorPicker is true', ()=>{
        let wrapper = shallow(<ColorPicker color={colorPickerProps} isBackgroundColorPicker />).first().shallow();
        wrapper.instance().handleOnChange({ rgb:{r: '0', g: '0', b: '0', a: '.3' }});
        expect(wrapper.instance().state.color).toEqual({"a": ".3", "b": "0", "g": "0", "r": "0"});
        expect(document.body.style.backgroundColor).toEqual("rgba(0, 0, 0, 0.3)")
        document.body.style = null
    })

    it('handleOnChange should call call back if isBackgroundColorPicker is false', ()=>{
        let handleChangeColor = jest.fn();
        let element = shallow(<ColorPicker color={colorPickerProps} isBackgroundColorPicker={false} handleChangeColor={handleChangeColor} />).first().shallow();
        element.update();
        element.instance().handleOnChange({ rgb:{r: '0', g: '0', b: '0', a: '.3' }});
        expect(document.body.style.backgroundColor).toEqual("");
        expect(handleChangeColor).toHaveBeenCalled()
    })


    it('handleClickOutside should set displayColorPicker state to false', ()=>{
        const spy = jest.spyOn(ColorPicker.prototype, 'handleClickOutside');
        let wrapper = shallow(<ColorPicker color={colorPickerProps} />);
        document.body.click();
        expect(wrapper.instance().state.displayColorPicker).toBeFalsy()
        expect(spy).toHaveBeenCalled()
    });


});
