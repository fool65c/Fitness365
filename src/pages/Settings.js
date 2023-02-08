import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Text, TextInput, HelperText } from 'react-native-paper';

import { 
    setProtineGoal,
    setCarbGoal,
    setFatGoal,
    setMealsPerDay,
    setUDSAAPIKey
} from '../store/settings/actions';

const Settings = ({ navigation }) => {
    const { 
        dailyGoals,
        mealCount,
        USDAAPIKey
    } = useSelector(state => state.settingReducer);

    const dispatch = useDispatch();

    const [inputErrors, setInputErrors] = React.useState({
        protine: false,
        carbs: false,
        fat: false,
        meals: false
    })

    const updateGoal = (goalName, func, goal) => {
        if (!isNaN(goal)) {
            setInputErrors({
                ...inputErrors,
                [goalName]: false
            })

            if (goal.length == 0) {
                dispatch(func(''))
            } else {
                dispatch(func(parseFloat(goal)))
            }
            setInputErrors({
                ...inputErrors,
                [goalName]: false
            })
            
        } else {
            setInputErrors({
                ...inputErrors,
                [goalName]: true
            })
        }
    }

    const containerStyle = {backgroundColor: 'white', padding: 20};

    const inputStyle = {
        marginLeft: 10,
        marginRight: 10
    }

    return (
        <SafeAreaView>
            <Text 
                variant="titleLarge"
                style={{margin:10}}
            >
                Settings
            </Text>
            <TextInput 
                mode='outlined'
                inputmode='numeric'
                label='Total Protine Per Day(G)'
                placeholder='grams'
                error={inputErrors.protine}
                value={dailyGoals.protine.toString()}
                onChangeText={(protine, e) => {
                    updateGoal('protine', setProtineGoal,protine)
                }}
                style={inputStyle}
            />
            <HelperText type="error" visible={inputErrors.protine}>
                Daily Protine is requireed and must be a whole number
            </HelperText>
            <TextInput 
                mode='outlined'
                inputmode='numeric'
                label='Total Carbs Per Day(G)'
                placeholder='grams'
                error={inputErrors.carbs}
                value={dailyGoals.carbs.toString()}
                onChangeText={(carbs) => {
                    updateGoal('carbs', setCarbGoal,carbs)
                }}
                style={inputStyle}
            />
            <HelperText type="error" visible={inputErrors.carbs}>
                Daily Carbs are requireed and must be a whole number
            </HelperText>
            <TextInput 
                mode='outlined'
                inputmode='numeric'
                label='Total Fat Per Day(G)'
                placeholder='grams'
                error={inputErrors.fat}
                value={dailyGoals.fat.toString()}
                onChangeText={(fat) => {
                    updateGoal('fat', setFatGoal,fat)
                }}
                style={inputStyle}
            />
            <HelperText type="error" visible={inputErrors.fat}>
                Daily Fat is requireed and must be a whole number
            </HelperText>
            <TextInput 
                mode='outlined'
                inputmode='numeric'
                label='Meals Per Day'
                placeholder='count'
                error={inputErrors.meals}
                value={mealCount.toString()}
                onChangeText={(meals) => {
                    updateGoal('meals', setMealsPerDay,meals)
                }}
                style={inputStyle}
            />
            <HelperText type="error" visible={inputErrors.meals}>
                Daily Meal count is requireed
            </HelperText>
            <TextInput 
                mode='outlined'
                label='USDA API Key'
                placeholder='key'
                value={USDAAPIKey}
                onChangeText={(apiKey) => {
                    dispatch(setUDSAAPIKey(apiKey))
                }}
                style={inputStyle}
            />
        </SafeAreaView>
    );
};

export default Settings;