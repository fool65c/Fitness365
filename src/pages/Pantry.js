import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView, View, FlatList } from "react-native";
import { TextInput, IconButton, Dialog, Button, Text, HelperText} from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';

import FoodDisplay from "../components/FoodDisplay";
import { showFoodModal, showFoodSearchModal } from "../store/modal/actions";
import { emptyFood } from "../store/food/reducer";

const Pantry = () => {

    const dispatch = useDispatch();
    const { foods } = useSelector(state => state.foodReducer);
    const [filterTerm, updateFilterTerm] = useState('');
    const [showAddDialog, updateShowAddDialog] = useState(false);
    const [dialogFood, updateDialogFood] = useState(emptyFood);
    const [foodServings, updateFoodServings] = useState(1);
    const [foodAmount, updateFoodAmount] = useState(false);

    const [logDate, updateLogDate] = useState(new Date());
    const getLogDates = () => {
        let now = new Date();
        let options = []

        // updateLogDate(now.toJSON().split('T')[0])
        for (let i=0;i<=7;i++) {
            now.setDate(now.getDate() - 1);
            options.push(now.toJSON().split('T')[0]);
        }

        return options;
    }


    const hideDialog = () => {
        updateShowAddDialog(false);
    }

    const openAddDialog = (food) => {
        console.log('buttonAction', food)
        updateDialogFood(food);
        updateFoodServings(1);
        updateFoodAmount(food.servingSize.value);
        updateShowAddDialog(true);
    }

    const openEditModal = (foodId) => {
        console.log('openEditModal', foodId)
        dispatch(showFoodModal(foodId))
    }

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
                console.log(value)
                return value.toString();
            }
         }
    }

    return (
        <>
            <SafeAreaView >  
                <View style={{flexDirection:'row'}}>
                    <TextInput 
                        style={{width:'70%', marginLeft: 10}} 
                        mode='outlined'
                        label='Filter'
                        onChangeText={updateFilterTerm}
                    />
                    <IconButton icon='cloud-search-outline' onPress={() => dispatch(showFoodSearchModal())}/>
                    <IconButton icon='cart-plus' onPress={() => dispatch(showFoodModal())}/>
                    </View>
                <FlatList
                    data={Object.values(foods).filter(food => {
                        return filterTerm.length > 0 
                                ? food.brandName.toLowerCase().includes(filterTerm.toLowerCase()) || food.name.toLowerCase().includes(filterTerm.toLowerCase())
                                : true;
                    })}
                    renderItem={({item, index, separators}) => {
                        return (
                            <FoodDisplay
                                food={item}
                                buttonAction={<IconButton icon='plus' onPress={() => openAddDialog(item)}/>}
                                displayAction={() => openEditModal(item.id)}
                            />
                        )
                        }}
                />  
            </SafeAreaView>
            <Dialog visible={showAddDialog} onDismiss={hideDialog}>
                <Dialog.Title>Log {dialogFood.name}</Dialog.Title>
                <Dialog.Content>
                    <View flexDirection='row' >
                        <Text variant='headlineSmall' style={{marginRight:5}}>Date</Text>
                        <DateTimePicker 
                            mode='date' 
                            value={logDate}
                            onChange={(event,date) => {
                                updateLogDate(date)
                            }}
                            maximumDate={new Date()}
                        />
                    </View>
                    <View flexDirection='row'>
                        <TextInput 
                            mode='outlined'
                            inputmode='number'
                            label='Servings'
                            placeholder='Servings'
                            value={displayValues(foodServings)}
                            error={!parseFloat(foodServings)}
                            onChangeText={(ss) => {
                                updateFoodAmount(parseFloat(ss) * dialogFood.servingSize.value)
                                updateFoodServings(ss)
                            }}
                            style={{
                                marginLeft: 10,
                                width: '45%'
                            }}
                        />
                        <TextInput 
                            mode='outlined'
                            inputmode='number'
                            label='Amount'
                            placeholder='Amount'
                            value={displayValues(foodAmount)}
                            error={!parseFloat(foodAmount)}
                            onChangeText={(a) => {
                                updateFoodAmount(a);
                                updateFoodServings(parseFloat(a) /  dialogFood.servingSize.value)
                            }}
                            style={{
                                marginLeft: 10,
                                width: '45%'
                            }}
                        />
                    </View>
                    <View flexDirection='row'>
                        <Text variant='bodyMedium'>{parseFloat(foodServings) ? Math.ceil(dialogFood.calories.value * foodServings) : 0}</Text>
                        <Text variant='bodyMedium'>{dialogFood.calories.units}</Text>
                        <Text variant='bodyMedium'> P:</Text>
                        <Text variant='bodyMedium'>{parseFloat(foodServings) ? Math.ceil(dialogFood.protine.value * foodServings) : 0}</Text>
                        <Text variant='bodyMedium'>{dialogFood.protine.units}</Text>
                        <Text variant='bodyMedium'> C:</Text>
                        <Text variant='bodyMedium'>{parseFloat(foodServings) ? Math.ceil(dialogFood.carbs.value * foodServings) : 0}</Text>
                        <Text variant='bodyMedium'>{dialogFood.carbs.units}</Text>
                        <Text variant='bodyMedium'> F:</Text>
                        <Text variant='bodyMedium'>{parseFloat(foodServings) ? Math.ceil(dialogFood.fat.value * foodServings) : 0}</Text>
                        <Text variant='bodyMedium'>{dialogFood.fat.units}</Text>
                    </View>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Log</Button>
                    <Button onPress={hideDialog}>Done</Button>
                </Dialog.Actions>
            </Dialog>      
        </>
    )
}

export default Pantry;