import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
import SelectBox from './../index';

describe('SelectBox', ()=>{
    it('renders correctly', ()=>{
        const selectBoxProps = {
            id:"CardType",
            options : [
                { value:"VISA", title:"Visa Credit" },
                { value:"DELTA", title:"Visa Debit/Electron" },
                { value:"AMEX", title:"American Express" },
                { value:"DINERS", title:"Diners Club" },
                { value:"MC", title:"MasterCard Credit" },
                { value:"MCDEBIT", title:"MasterCard Debit" },
                { value:"SWITCH", title:"Maestro" },
            ],
            defaultSelectedOptionTitle: "Select a card type",
            onChange:()=>{}
        };
    
        let tree = renderer.create(
            <SelectBox {...selectBoxProps}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
