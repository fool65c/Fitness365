import { useSelector, useDispatch } from 'react-redux';
import { FlatList, SafeAreaView, View } from 'react-native';

import { Modal, Button, Surface, Text, TextInput} from "react-native-paper";


import { hideLogDetailModal } from '../store/modal/actions';
import { logUpdateFood, logUpdateMeal } from '../store/log/actions';
import LogSummary from "../components/LogSummay";
import FoodDisplay from '../components/FoodDisplay';

const LogDetialModal = () => {
    const {showLogDetailModal, logDetailDate} = useSelector(state => state.modalReducer)
    const { log } = useSelector(state => state.logReducer);
    const { foods } = useSelector(state => state.foodReducer);
    const { meals } = useSelector(state => state.mealReducer);
    
    const dispatch = useDispatch();
    const containerStyle = {backgroundColor: 'white', padding: 5};
    if (!logDetailDate) {
        return '';
    }

    const logDetail = log[logDetailDate]

    const hideLogDetail = () => {
        dispatch(hideLogDetailModal())
    }

    return (
        <Modal visible={showLogDetailModal} onDismiss={hideLogDetail} contentContainerStyle={containerStyle}>
            <SafeAreaView>
                <View flexDirection='row'>
                    <View style={{flex:2}}>
                    <LogSummary day={logDetail} />
                    </View>
                    <Button 
                        mode='outlined' 
                        icon='close' 
                        onPress={hideLogDetail}
                        style={{alignSelf:'center'}}
                    >
                            Done
                    </Button>
                </View>
            <FlatList 
                data={Object.values(logDetail.foods).map((food) => {
                    return {
                        ...food,
                        ...foods[food.foodId],
                        key: food.foodId
                    };
                })}
                renderItem={({item}) => {
                    return (
                        <FoodDisplay 
                            food={item}
                            buttonAction={
                                <TextInput 
                                    label='Servings' 
                                    onChangeText={(value) => {
                                        dispatch(logUpdateFood(
                                            logDetailDate,
                                            item,
                                            parseFloat(value)
                                        ))
                                    }} 
                                    value={item.servings ? item.servings.toString() : ''} 
                                    style={{width:100}}
                                />
                            }
                        />
                    )
                }}
            />
                        <FlatList 
                data={Object.values(logDetail.meals).map((meal) => {
                    console.log(meal)
                    return {
                        ...meal,
                        ...meals[meal.mealId],
                        key: meal.mealId
                    };
                })}
                renderItem={({item}) => {
                    console.log(item)
                    return (
                        <View flexDirection='row'>
                        <Text>{item.date}</Text>
                        <TextInput 
                                    label='Servings' 
                                    onChangeText={(value) => {
                                        dispatch(logUpdateMeal(
                                            logDetailDate,
                                            item,
                                            parseFloat(value)
                                        ))
                                    }} 
                                    value={item.servings ? item.servings.toString() : ''} 
                                    style={{width:100}}
                                />
                        </View>
                                
            
                    )
                }}
            />
            
            
            </SafeAreaView>
        </Modal>
    )
}

export default LogDetialModal;