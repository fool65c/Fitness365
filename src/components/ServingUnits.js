import React from 'react';
import SelectBox from './Multi-Select/index'

export const ServingUnits = Object.freeze({
	G: Symbol('G'),
    CUP: Symbol('CPU'),
    ML: Symbol('ML'),
    OZ: Symbol('OZ'),
    EACH: Symbol('EACH')
})

export const ServinGUnitsFromString = (inputString) => {
    return Symbol.for(inputString.toUpperCase());
}

const ServingUnitSelect = (props) => {
    return (
        <SelectBox 
            label='Serving Units'
            value={props.value}
            hideInputFilter={true}
            options={[
                { id: 'G', item: 'G'},
                { id: 'CUP', item: 'Cup'},
                { id: 'ML', item: 'ML'},
                { id: 'OZ', item: 'Oz'},
                { id: 'EACH', item: 'Each'},
            ]}
            onChange={props.onChange}
        />
    )
}

export default ServingUnitSelect
