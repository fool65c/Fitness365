import { View } from "react-native";
import { Dialog, TextInput, Button } from "react-native-paper"

import FloatInput from "../components/FloatInput"

const InputStyle = {
    marginLeft: 10,
    width: '45%'
};

const MealEditDialog = (props) => {
    return (
        <Dialog visible={props.visible} onDismiss={props.hideDialogFunction}>
                <Dialog.Title>{props.mealSummary.date} Details</Dialog.Title>
                <Dialog.Content>
                    <View flexDirection='row'>
                        <FloatInput
                            label='Serving Size'
                            value={props.mealSummary.servingSize.value}
                            onChangeText={(ss) => {
                                props.updateFunction({
                                    ...props.mealSummary,
                                    servingSize: {
                                        ...props.mealSummary.servingSize,
                                        value: ss
                                    }
                                })
                            }}
                            style={InputStyle}
                        />
                        <TextInput 
                            mode='outlined'
                            inputmode='number'
                            label='Serving Unit'
                            placeholder='Serving Unit'
                            value={props.mealSummary.servingSize.units}
                            error={props.mealSummary.servingSize.units.length == 0}
                            onChangeText={(su) => {
                                props.updateFunction({
                                    ...props.mealSummary,
                                    servingSize: {
                                        ...props.mealSummary.servingSize,
                                        units: su
                                    }
                                })
                            }}
                            style={InputStyle}
                        />    
                    </View>
                    <View flexDirection='row'>
                        <FloatInput 
                            label='Protine'
                            value={props.mealSummary.protine.value}
                            onChangeText={(p) => {
                                props.updateFunction({
                                    ...props.mealSummary,
                                    summary: {
                                        ...props.mealSummary.summary,
                                        protine: {
                                            ...props.mealSummary.protine,
                                            value: p,
                                        }
                                    }
                                })
                            }}
                            style={InputStyle}
                        />
                        <TextInput 
                            mode='outlined'
                            inputmode='number'
                            label='Units'
                            placeholder='Unit'
                            disabled={true}
                            value='G'
                            style={InputStyle}
                        />    
                    </View> 
                    <View flexDirection='row'>
                        <FloatInput 
                            label='Carbs'
                            value={props.mealSummary.carbs.value}
                            onChangeText={(c) => {
                                props.updateFunction({
                                    ...props.mealSummary,
                                    summary: {
                                        ...props.mealSummary,
                                        carbs: {
                                            ...props.mealSummary.carbs,
                                            value: c
                                        }
                                    }
                                })
                            }}
                            style={InputStyle}
                        />
                        <TextInput 
                            mode='outlined'
                            inputmode='number'
                            label='Units'
                            placeholder='Unit'
                            disabled={true}
                            value='G'
                            style={InputStyle}
                        />    
                    </View>    
                    <View flexDirection='row'>
                        <FloatInput 
                            label='Fat'
                            value={props.mealSummary.fat.value}
                            onChangeText={(f) => {
                                props.updateFunction({
                                    ...props.mealSummary,
                                    summary: {
                                        ...props.mealSummary,
                                        fat: {
                                            ...props.mealSummary.fat,
                                            value: f
                                        }
                                    }
                                })
                            }}
                            style={InputStyle}
                        />
                        <TextInput 
                            mode='outlined'
                            inputmode='number'
                            label='Units'
                            placeholder='Unit'
                            disabled={true}
                            value='G'
                            style={InputStyle}
                        />    
                    </View>                 
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={props.hideDialogFunction}>Done</Button>
                </Dialog.Actions>
            </Dialog>
    );
}

export default MealEditDialog;