import React from "react";

import { TextInput } from "react-native-paper";


const displayValues = (value) => {
    if (!value || value.length == 0) {
        return '';
    }
    if (Number.isInteger(parseFloat(value))) {
        return value.toString();
     } else {
        if (value.toString().split('.')[1].length > 2) {
            return value.toFixed(2);
        } else {
            return value.toString();
        }
     }
}

const FloatInput = (props) => {    
    const [value, updateValue] = React.useState(props.value);

    React.useEffect((v) => {
        updateValue(props.value);
    }, [props.value]);

    return (
        <TextInput 
            mode='outlined'
            inputmode='number'
            label={props.label}
            placeholder={props.label}
            value={displayValues(value)}
            error={!parseFloat(value)}
            onChangeText={(v) => {
                if (v.endsWith('.')) {
                    updateValue(v)
                } else {
                    updateValue(parseFloat(v));
                    props.onChangeText(parseFloat(v))
                }
                
            }}
            style={props.style}
        />
    )
}

export default FloatInput