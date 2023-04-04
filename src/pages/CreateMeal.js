import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";

import { View, SafeAreaView, FlatList } from "react-native";
import { Button, Text, TextInput, IconButton, Dialog } from "react-native-paper";

import SelectBox from '../components/Multi-Select/index'
import LogSummary from '../components/LogSummay';
import FoodDisplay from '../components/FoodDisplay';
import MealEditDialog from '../dialog/MealEditDialog';
import ServingsEditDialog from '../dialog/ServingsEditDialog';
import { updateMeal } from '../store/meals/actions';
import { emptyFood } from '../store/food/reducer';
import { emptyMeal } from '../store/meals/reducer';

const CreateMeal = (props) => {
    const editMode = props.route.params ? true : false;
    const defaultMeal = editMode ? props.route.params : emptyMeal;
    const [ mealSummary, updateMealSummary ] = React.useState(defaultMeal);
    const [ showAddDetailsDialog, updateShowAddDetailsDialog ] = React.useState(false)
    const [ showServingDialog, updateShowServingDialog ] = React.useState(false)
    const [ servingDialogFood, updateServingDialogFood ] = React.useState(emptyFood)
    const dispatch = useDispatch();
    const { foods } = useSelector(state => state.foodReducer);
    const [ selectedFoods, updateSelectedFoods ] = React.useState({})

    const actionButtonText = editMode ? 'Update' : 'Create';

    React.useEffect(() => {
        updateMealSummary({
            ...mealSummary,
            calories: {
                value: Object.values(mealSummary.foods).reduce((calories, food) => {
                    return calories += foods[food.id].calories.value * food.servings
                }, 0),
                units: 'KCAL'
            },
            protine: {
                value: Object.values(mealSummary.foods).reduce((protine, food) => {
                    return protine += foods[food.id].protine.value * food.servings
                }, 0),
                units: 'G'
            },
            carbs: {
                value: Object.values(mealSummary.foods).reduce((carbs, food) => {
                    return carbs += foods[food.id].carbs.value * food.servings
                }, 0),
                units: 'G'
            },
            fat: {
                value: Object.values(mealSummary.foods).reduce((fat, food) => {
                    return fat += foods[food.id].fat.value * food.servings
                }, 0),
                units: 'G'
            },
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
                    <Text variant='headlineMedium'>{actionButtonText} Meal</Text>
                    <Button
                        mode='outlined'
                        icon='plus'
                        onPress={() => {
                            dispatch(updateMeal(mealSummary))
                            goBack();
                        }}
                        disabled={mealSummary.date.length == 0}
                    >
                        {actionButtonText}
                    </Button>
                    <Button
                        mode='outlined'
                        icon='close'
                        onPress={goBack}
                    >
                        Close
                    </Button>
                </View>
                <LogSummary day={mealSummary} showMealSummary={true}/>
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
                    });
                    hideServingDialog()
                }}
                hideDialog={hideServingDialog}
            />
        </>
    );
}

export default CreateMeal;