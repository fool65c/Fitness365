import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";

import { View, SafeAreaView, FlatList } from "react-native";
import { Button, Text, TextInput, IconButton, Dialog } from "react-native-paper";

import SelectBox from '../components/Multi-Select/index'
import LogSummary from '../components/LogSummay';
import FoodDisplay from '../components/FoodDisplay';
import MealEditDialog from '../dialog/MealEditDialog';
import ServingsEditDialog from '../dialog/ServingsEditDialog';
import { emptyFood } from '../store/food/reducer';

const CreateMeal = (props) => {
    const [ mealSummary, updateMealSummary ] = React.useState({
        date: '',
        servingSize: {
            value: 1,
            units: 'each'
        },
        summary: {
            calories: 0,
            protine: 0,
            carbs: 0,
            fat: 0
        },
        foods: {}
    });
    const [ showAddDetailsDialog, updateShowAddDetailsDialog ] = React.useState(false)
    const [ showServingDialog, updateShowServingDialog ] = React.useState(false)
    const [ servingDialogFood, updateServingDialogFood ] = React.useState(emptyFood)
    const dispatch = useDispatch();
    const { foods } = useSelector(state => state.foodReducer);
    const [ selectedFoods, updateSelectedFoods ] = React.useState({})

    React.useEffect(() => {
        updateMealSummary({
            ...mealSummary,
            summary: Object.values(mealSummary.foods).reduce((summary, food) => {
                return {
                    calories: summary.calories + foods[food.id].calories.value * food.servings,
                    protine: summary.protine + foods[food.id].protine.value * food.servings,
                    carbs: summary.carbs + foods[food.id].carbs.value * food.servings,
                    fat: summary.fat + foods[food.id].fat.value * food.servings,
                }
            }, {
                calories: 0,
                protine: 0,
                carbs: 0,
                fat: 0
            })
        })
    }, [mealSummary.foods])
    
    const goBack = () => {
        props.navigation.goBack();
    }

    const hideAddDetailsDialog = () => {
        updateShowAddDetailsDialog(false);
    }

    const hideServingDialog = () => {
        updateShowServingDialog(false);
    }

    const removeFood = (foodId) => {
        delete selectedFoods[foodId];
        updateSelectedFoods(selectedFoods);
        delete mealSummary.foods[foodId];  
        updateMealSummary({
            ...mealSummary,
            foods: {
                ...mealSummary.foods
            }
        });  
    }


    return (
        <>
            <SafeAreaView>
                <View 
                    flexDirection='row' 
                    style={{
                        justifyContent:'space-between',
                        margin: 5
                    }}
                >
                    <Text variant='headlineMedium'>Create Meal</Text>
                    <Button
                        mode='outlined'
                        icon='close'
                        onPress={goBack}
                    >
                        Close
                    </Button>
                </View>
                <LogSummary day={mealSummary}/>
                <TextInput 
                    value={mealSummary.date}
                    style={{marginLeft: 10, marginRight: 10}}
                    label='Meal Name'
                    onChangeText={(name) => {
                        updateMealSummary({
                        ...mealSummary,
                        date: name
                    })}}
                />
                <SelectBox
                    label=''
                    options={
                        Object.values(foods).map((food) => {
                            return {id: food.id, item: food.brandName + ':' + food.name}
                        }).filter((food) => { return !(food.id in selectedFoods)})
                    }
                    selectedValues={Object.values(selectedFoods)}
                    onMultiSelect={(food) => {
                        updateSelectedFoods({
                            ...selectedFoods,
                            [food.id]: food
                        })
                        updateMealSummary({
                            ...mealSummary,
                            foods: {
                                ...mealSummary.foods,
                                [food.id]: {
                                    id: food.id,
                                    servings: 1
                                }
                            }
                        });
                    }}
                    extraAction={<Button icon='plus' onPress={() => updateShowAddDetailsDialog(true)}>Edit Details</Button>}
                    selectIcon={<Button icon='plus'>Add Food</Button>}
                    onTapClose={(food) => console.log(food, 'here?')}
                    isMulti={true}
                />
                <FlatList 
                    data={Object.keys(mealSummary.foods).map(foodId => {
                        return foods[foodId]
                    })}
                    renderItem={({item, index, separators}) => {
                        return (
                            <FoodDisplay
                                food={item}
                                buttonAction={<IconButton icon='delete' onPress={() => removeFood(item.id)}/>}
                                displayAction={() => {
                                    updateServingDialogFood(foods[item.id])
                                    updateShowServingDialog(true)
                                }}
                            />
                        )
                    }}
                />
                
            </SafeAreaView>
            <MealEditDialog
                visible={showAddDetailsDialog}
                mealSummary={mealSummary}
                updateFunction={updateMealSummary}
                hideDialogFunction={hideAddDetailsDialog}
            />
            <ServingsEditDialog 
                visible={showServingDialog}
                showDate={false}
                food={servingDialogFood}
                submitText='Update'
                initialServing={servingDialogFood.id in mealSummary.foods ? mealSummary.foods[servingDialogFood.id].servings : 9999}
                submitFunction={(date, food, servings) => {
                    updateMealSummary({
                        ...mealSummary,
                        foods: {
                            ...mealSummary.foods,
                            [food.id]: {
                                id: food.id,
                                servings: servings
                            }
                        }
                    })
                }}
                hideDialog={hideServingDialog}
            />
        </>
    );
}

export default CreateMeal;