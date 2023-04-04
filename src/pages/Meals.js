import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView, View, FlatList } from "react-native";
import { TextInput, Button, Dialog, IconButton, Text } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';

import { emptyMeal } from "../store/meals/reducer";
import { deleteMeal } from "../store/meals/actions";
import { logMeal } from "../store/log/actions"
import LogSummary from '../components/LogSummay';
import FloatInput from "../components/FloatInput";

const Meals = ({props}) => {

    const dispatch = useDispatch();
    const { meals } = useSelector(state => state.mealReducer);
    const [filterTerm, updateFilterTerm] = useState('');
    const [showAddDialog, updateShowAddDialog] = useState(false);
    const [dialogMeal, updateDialogMeal] = useState(emptyMeal);
    const [dialogMealServings, updateDialogMealServings] = useState(1);
    const [logDate, updateLogDate] = useState(props.logDate ? props.logDate : new Date());

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
                    <Button 
                        icon='plus-circle-outline' 
                        style={{ alignSelf: "flex-end" }} 
                        onPress={() => props.navigation.navigate('CreateMeal')}
                    >
                        Add
                    </Button>
                </View>
                <FlatList
                    data={Object.values(meals).filter(meals => {
                        return filterTerm.length > 0 
                                ? meals.date.toLowerCase().includes(filterTerm.toLowerCase())
                                : true;
                    })}
                    renderItem={({item, index, separators}) => {
                        return (
                            <LogSummary 
                                day={item}
                                showMealSummary={true}
                                button={
                                    <IconButton 
                                        icon='plus'
                                        onPress={() => {
                                            updateDialogMeal(item);
                                            updateShowAddDialog(true);
                                        }}
                                    />      
                                }
                                action={() => {
                                    props.navigation.navigate('CreateMeal', {...item})
                                }}
                            />  
                        )}
                    }
                />
            </SafeAreaView>
            <Dialog visible={showAddDialog} onDismiss={() => {updateShowAddDialog(false)}}>
            <Dialog.Title>
                {dialogMeal.date}
                <IconButton 
                    icon='delete'
                    onPress={() => {
                            dispatch(deleteMeal(dialogMeal.id))
                            updateShowAddDialog(false);
                        }}
                />      
            </Dialog.Title>
            <Dialog.Content>
                <View flexDirection='row' >
                    <Text variant='headlineSmall' style={{marginRight:5}}>Date</Text>
                    <DateTimePicker 
                        mode='date' 
                        value={logDate}
                        onChange={(event,date) => {
                            updateLogDate(date);
                        }}
                        maximumDate={props.maxLogDate ? props.maxLogDate : new Date()}
                    />
                </View>
                <FloatInput 
                    label='ServingSize'
                    value={dialogMealServings}
                    onChangeText={(servings) => {
                        updateDialogMealServings(servings)
                    }}
                />
                <View flexDirection='row'>
                    <Text>{dialogMeal.servingSize.value} {dialogMeal.servingSize.units}</Text>
                    <Text>{dialogMeal.calories * dialogMealServings}KCAL</Text>
                    <Text>{dialogMeal.protine * dialogMealServings}P</Text>
                    <Text>{dialogMeal.carbs * dialogMealServings}C</Text>
                    <Text>{dialogMeal.fat * dialogMealServings}F</Text>
                </View>
            </Dialog.Content>
            <Dialog.Actions>
                    <Button onPress={() => {
                        dispatch(logMeal(
                            logDate.toLocaleString().split(',')[0],
                            dialogMeal,
                            dialogMealServings
                        ))
                        updateShowAddDialog(false)}
                    }>
                        Log
                    </Button>
                    <Button onPress={() => {updateShowAddDialog(false)}}>Done</Button>
                </Dialog.Actions>
            </Dialog>
        </>
    )
}

export default Meals;