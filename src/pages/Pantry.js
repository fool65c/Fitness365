import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView, View, FlatList } from "react-native";
import { TextInput, IconButton, Dialog, Button, Text } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';

import FoodDisplay from "../components/FoodDisplay";
import { showFoodModal, showFoodSearchModal } from "../store/modal/actions";
import { emptyFood } from "../store/food/reducer";
import { logFood } from "../store/log/actions";
import FloatInput  from "../components/FloatInput";
import ServingsEditDialog from "../dialog/ServingsEditDialog";

const Pantry = ({props}) => {

    const dispatch = useDispatch();
    const { foods } = useSelector(state => state.foodReducer);
    const [filterTerm, updateFilterTerm] = useState('');
    const [showAddDialog, updateShowAddDialog] = useState(false);
    const [dialogFood, updateDialogFood] = useState(emptyFood);
    const [foodServings, updateFoodServings] = useState(1);
    const [foodAmount, updateFoodAmount] = useState(false);

    const [logDate, updateLogDate] = useState(new Date());

    const hideDialog = () => {
        updateShowAddDialog(false);
    }

    const openAddDialog = (food) => {
        updateDialogFood(food);
        updateFoodServings(1);
        updateFoodAmount(food.servingSize.value);
        updateShowAddDialog(true);
    }

    const openEditModal = (foodId) => {
        dispatch(showFoodModal(foodId))
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
                    <IconButton 
                        icon='cloud-search-outline' 
                        onPress={() => {
                            props.navigation.navigate('FoodSearch')
                        }}
                    />
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
            <ServingsEditDialog 
                visible={showAddDialog}
                initialServing={1}
                showDate={true}
                hideDialog={hideDialog}
                food={dialogFood}
                submitFunction={(date, food, servings) => {
                    dispatch(logFood(
                        date.toLocaleString().split(',')[0],
                        food,
                        servings
                    ));
                    hideDialog();
                }}
            />   
        </>
    )
}

export default Pantry;