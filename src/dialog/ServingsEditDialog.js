import { useState, useEffect } from "react";
import { View } from "react-native"
import { Dialog, Text, Button } from "react-native-paper"
import DateTimePicker from '@react-native-community/datetimepicker';

import FloatInput from "../components/FloatInput"

const ServingsEditDialog = (props) => {
    // showDate: to show the date picker or not, default false
    // maxLogDate: max date that can be logged, default TODAY
    // visible: if popup is visable or not
    // hideDialog: function to call when hiding the dialog
    // food: the food to display
    // submitFunction: (date, food, servings)
    // submitText: text to show for action button, default Log
    // initialServing: the initialServing Size before edit

    const [logDate, updateLogDate] = useState(props.logDate ? props.logDate : new Date());
    const initialServing = props.initialServing ? props.initialServing : 1
    const [servings, updateServings] = useState(initialServing);
    const initialPortion = props.food.servingSize.value * initialServing;
    const [servingPortion, updateServingPortion] = useState(initialPortion);

    useEffect(() => {
        updateServings(props.initialServing);
        updateServingPortion(props.food.servingSize.value * props.initialServing);
    }, [props.initialServing]);

    useEffect(() => {
        updateServings(props.initialServing);
        updateServingPortion(props.food.servingSize.value * props.initialServing);
    }, [props.food.servingSize.value]);

    const submitText = props.submitText ? props.submitText : 'Log';

    return (
        <Dialog visible={props.visible} onDismiss={props.hideDialog}>
                <Dialog.Title>Log {props.food.name}</Dialog.Title>
                <Dialog.Content>
                    {   props.showDate &&  
                        <View flexDirection='row' >
                            <Text variant='headlineSmall' style={{marginRight:5}}>Date</Text>
                            <DateTimePicker 
                                mode='date' 
                                value={logDate}
                                onChange={(event,date) => {
                                    updateLogDate(date);
                                    props.updateLogDateFunction(date);
                                }}
                                maximumDate={props.maxLogDate ? props.maxLogDate : new Date()}
                            />
                        </View>
                    }
                    
                    <View flexDirection='row'>
                        <FloatInput 
                            label='Servings'
                            value={servings}
                            onChangeText={(ss) => {
                                updateServingPortion(ss * props.food.servingSize.value)
                                updateServings(ss)
                            }}
                            style={{
                                marginLeft: 10,
                                width: '45%'
                            }}
                        />
                        <FloatInput 
                            label={props.food.servingSize.units}
                            value={servingPortion}
                            onChangeText={(a) => {
                                updateServingPortion(a);
                                updateServings(a /  props.food.servingSize.value);
                            }}
                            style={{
                                marginLeft: 10,
                                width: '45%'
                            }}
                        />
                    </View>
                    <View flexDirection='row'>
                        <Text variant='bodyMedium'>{parseFloat(servings) ? Math.ceil(props.food.calories.value * servings) : 0}</Text>
                        <Text variant='bodyMedium'>{props.food.calories.units}</Text>
                        <Text variant='bodyMedium'> P:</Text>
                        <Text variant='bodyMedium'>{parseFloat(servings) ? Math.ceil(props.food.protine.value * servings) : 0}</Text>
                        <Text variant='bodyMedium'>{props.food.protine.units}</Text>
                        <Text variant='bodyMedium'> C:</Text>
                        <Text variant='bodyMedium'>{parseFloat(servings) ? Math.ceil(props.food.carbs.value * servings) : 0}</Text>
                        <Text variant='bodyMedium'>{props.food.carbs.units}</Text>
                        <Text variant='bodyMedium'> F:</Text>
                        <Text variant='bodyMedium'>{parseFloat(servings) ? Math.ceil(props.food.fat.value * servings) : 0}</Text>
                        <Text variant='bodyMedium'>{props.food.fat.units}</Text>
                    </View>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => {
                        props.submitFunction(logDate, props.food, servings);
                    }}>{submitText}</Button>
                    <Button 
                        onPress={() => {
                            props.hideDialog();
                        }}
                    >
                        Done
                    </Button>
                </Dialog.Actions>
            </Dialog>
    );
}

export default ServingsEditDialog;