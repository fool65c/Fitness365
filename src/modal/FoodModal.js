import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native'
import { 
    Modal, 
    Text, 
    TextInput, 
    Button 
} from 'react-native-paper';

import { hideFoodModal } from '../store/modal/actions';
import { emptyFood } from '../store/food/reducer';
import { deleteFood, updateFood } from '../store/food/actions';

import {Picker} from '@react-native-picker/picker';

const FoodModal = () => {

    const {showFoodModal, foodID} = useSelector(state => state.modalReducer)
    const {foods} = useSelector(state => state.foodReducer)
    const [food, updateTempFood] = React.useState(emptyFood)
    const dispatch = useDispatch();
    const containerStyle = {backgroundColor: 'white', padding: 20};
    const [brandError, updateBrandError] = React.useState(false);
    const [nameError, updateNameError] = React.useState(false)
    const [servingSizeError, updateServingSizeError] = React.useState(false)
    const [servingSizeUnitError, updateServingSizeUnitError] = React.useState(false)
    const [calError, updateCalError] = React.useState(false)
    const [protineError, updateProtineError] = React.useState(false)
    const [carbsError, updateCarbsError] = React.useState(false)
    const [fatError, updateFatError] = React.useState(false)
    const [inputError, updateInputError] = React.useState(false)
    const allowedUnits = ['G','ML','CUPS', 'CAN', 'EACH'];

    const hideModal = () => {
        updateTempFood(emptyFood)
        dispatch(hideFoodModal())
    }

    React.useEffect(() => {
        if (foodID) {
            updateTempFood(foods[foodID]);
        }
    }, [foodID])

    const validateStringInput = (str) => {
        if (str.length == 0) {
            updateInputError(true); 
            return true;  
        } else {
            return false;
        }
    }

    const validateNumericInput = (number) => {
        if (isNaN(number) || number.length == 0) {
            updateInputError(true); 
            return true;
        } else {
            return false;
        }
    }

    const validateUnits = (units) => {

        if (allowedUnits.includes(units)) {
            return false;
        } else {
            updateInputError(true); 
            return true;
        }
    }

    const deleteFoodItem = () => {
        dispatch(deleteFood(foodID));
        dispatch(hideFoodModal());
    }

    const saveFood = () => {
        updateInputError(false);
        updateBrandError(validateStringInput(food.brandName));
        updateNameError(validateStringInput(food.name));
        updateServingSizeError(validateNumericInput(food.servingSize.value));
        updateServingSizeUnitError(validateUnits(food.servingSize.units))
        updateCalError(validateNumericInput(food.calories.value));
        updateProtineError(validateNumericInput(food.protine.value));
        updateCarbsError(validateNumericInput(food.carbs.value));
        updateFatError(validateNumericInput(food.fat.value));

        if (inputError) {
            return;
        }

        dispatch(updateFood(food));
        hideModal();
    }

    return (
        <Modal visible={showFoodModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <View flexDirection='row' style={{justifyContent:'space-between'}}>
            <Text variant='headlineMedium'>{foodID ? 'Update Food' : 'Create Food'}</Text>
            <Button
                    mode='contained'
                    buttonColor='red'
                    style={{display: foodID ? 'block' : 'none'}}
                    onPress={deleteFoodItem}
                    icon='delete'
                >
                    Delete
                </Button>
            </View>
            <TextInput 
                mode='outlined'
                inputmode='text'
                label='Brand Name'
                placeholder='Brand name'
                value={food.brandName}
                error={brandError}
                onChangeText={(name) => {
                    updateTempFood({
                        ...food,
                        brandName: name
                    })
                }}
                style={inputStyle}
            />
            <TextInput 
                mode='outlined'
                inputmode='text'
                label='Name'
                placeholder='Food name'
                value={food.name}
                error={nameError}
                onChangeText={(name) => {
                    updateTempFood({
                        ...food,
                        name: name
                    })
                }}
                style={inputStyle}
            />
            <View flexDirection='row'>
                <TextInput 
                    mode='outlined'
                    inputmode='text'
                    label='Serving Size'
                    placeholder='Serving Size'
                    error={servingSizeError}
                    value={food.servingSize.value.toString()}
                    onChangeText={(ss) => {
                        updateTempFood({
                            ...food,
                            servingSize: {
                                ...food.servingSize,
                                value: parseFloat(ss) ? parseFloat(ss) : ''
                            }
                        })
                    }}
                    style={{
                        marginLeft: 10,
                        width: '45%'
                    }}
                />
                <TextInput 
                    mode='outlined'
                    inputmode='text'
                    label='Units'
                    placeholder='G'
                    value={food.servingSize.units}
                    error={servingSizeUnitError}
                    onChangeText={(ssu) => {
                        updateTempFood({
                            ...food,
                            servingSize: {
                                ...food.servingSize,
                                units: ssu.toUpperCase()
                            }
                        })
                    }}
                    style={{
                        marginRight: 10,
                        marginLeft: 15,
                        width: '45%'
                    }}
                />
            </View>
            <View flexDirection='row'>
                <TextInput 
                    mode='outlined'
                    inputmode='text'
                    label='Calories'
                    placeholder='Calories'
                    value={food.calories.value.toString()}
                    error={calError}
                    onChangeText={(c) => {
                        updateTempFood({
                            ...food,
                            calories: {
                                ...food.calories,
                                value: parseFloat(c) ? parseFloat(c) : ''
                            }
                        })
                    }}
                    style={{
                        marginLeft: 10,
                        width: '45%'
                    }}
                />
                <TextInput 
                    mode='outlined'
                    disabled={true}
                    inputmode='text'
                    label='Calories'
                    placeholder='KCAL'
                    value={food.calories.units}
                    style={{
                        marginRight: 10,
                        marginLeft: 15,
                        width: '45%'
                    }}
                />
            </View>
            <View flexDirection='row'>
                <TextInput 
                    mode='outlined'
                    inputmode='text'
                    label='Protine'
                    placeholder='Protine'
                    value={food.protine.value.toString()}
                    error={protineError}
                    onChangeText={(p) => {
                        updateTempFood({
                            ...food,
                            protine: {
                                ...food.protine,
                                value: parseFloat(p) ? parseFloat(p) : ''
                            }
                        })
                    }}
                    style={{
                        marginLeft: 10,
                        width: '45%'
                    }}
                />
                <TextInput 
                    mode='outlined'
                    disabled={true}
                    inputmode='text'
                    label='Units'
                    placeholder='G'
                    value={food.protine.unit}
                    style={{
                        marginRight: 10,
                        marginLeft: 15,
                        width: '45%'
                    }}
                />
            </View>
            <View flexDirection='row'>
                <TextInput 
                    mode='outlined'
                    inputmode='text'
                    label='Carbs'
                    placeholder='Carbs'
                    value={food.carbs.value.toString()}
                    error={carbsError}
                    onChangeText={(c) => {
                        updateTempFood({
                            ...food,
                            carbs: {
                                ...food.carbs,
                                value: parseFloat(c) ? parseFloat(c) : ''
                            }
                        })
                    }}
                    style={{
                        marginLeft: 10,
                        width: '45%'
                    }}
                />
                <TextInput 
                    mode='outlined'
                    disabled={true}
                    inputmode='text'
                    label='Units'
                    placeholder='G'
                    value={food.carbs.units}
                    style={{
                        marginRight: 10,
                        marginLeft: 15,
                        width: '45%'
                    }}
                />
            </View>
            <View flexDirection='row'>
                <TextInput 
                    mode='outlined'
                    inputmode='text'
                    label='Fat'
                    placeholder='Fat'
                    value={food.fat.value.toString()}
                    error={fatError}
                    onChangeText={(f) => {
                        updateTempFood({
                            ...food,
                            fat: {
                                ...food.fat,
                                value: parseFloat(f) ? parseFloat(f) : ''
                            }
                        })
                    }}
                    style={{
                        marginLeft: 10,
                        width: '45%'
                    }}
                />
                <TextInput 
                    mode='outlined'
                    disabled={true}
                    inputmode='text'
                    label='Units'
                    placeholder='G'
                    value={food.fat.units}
                    style={{
                        marginRight: 10,
                        marginLeft: 15,
                        width: '45%'
                    }}
                />
            </View>
            <View flexDirection='row' style={{justifyContent:'space-evenly'}} >
                <Button
                    mode='outlined'
                    icon='close'
                    style={{ width: 160, margin: 5 }}
                    onPress={hideModal}
                >
                    Cancel
                </Button>
                <Button
                    mode='contained'
                    style={{ width: 160, margin: 5}}
                    onPress={saveFood}
                >
                    {foodID ? 'Update Food' : 'Add Food'}
                </Button>
                
            </View>
        </Modal>
    );
};

const inputStyle = {
    marginLeft: 10,
    marginRight: 10
}

export default FoodModal;
