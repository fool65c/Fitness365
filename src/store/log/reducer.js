import uuid from 'react-native-uuid';

import { 
    LOG_FOOD,
    LOG_UPDATE_FOOD,
    LOG_MEAL,
    REMOVE_FOOD_LOG
} from './actions'
  
const initialState = {
    log: {}
};

const defaultLogEntry = {
    date: null,
    foods: {},
    meals: {},
    summary: {
        calories: 0,
        proine: 0,
        carbs: 0,
        fat: 0
    }
}

const getDailySummary = (day) => {
    let summary = {
        calories: 0,
        protine: 0,
        carbs: 0,
        fat: 0
    }

    Object.values(day.foods).forEach(food => {
        console.log('here we go again', summary.protine, food, food.summary.proine)
        summary.calories += food.summary.calories;
        summary.protine += food.summary.protine;
        summary.carbs += food.summary.carbs;
        summary.fat += food.summary.fat;
    })

    Object.values(day.meals).forEach(food => {
        summary.calories += food.summary.calories;
        summary.protine += food.summary.protine;
        summary.carbs += food.summary.carbs;
        summary.fat += food.summary.fat;
    })

    return summary;
}
  
function logReducer (state = initialState, action) {
    let date = action.payload ? action.payload.date : false;
    let food = action.payload ? action.payload.food : false;

    switch (action.type) {
        case LOG_FOOD:
            let servingSize = action.payload.servingSize;

            if (!(date in state.log)) {
                state.log[date] = defaultLogEntry;
                state.log[date].date = date;
            }

            if (!(food.id in state.log[date].foods)) {
                state.log[date].foods[food.id] = {
                    foodId: food.id,
                    servings: 0,
                    summary: {
                        calories: 0,
                        protine: 0,
                        carbs: 0,
                        fat: 0
                    }
                }
            }

            // update the servings and calculate the food summary
            state.log[date].foods[food.id].servings += servingSize;
            state.log[date].foods[food.id].summary.calories = food.calories.value * state.log[date].foods[food.id].servings;
            state.log[date].foods[food.id].summary.protine = food.protine.value * state.log[date].foods[food.id].servings;
            state.log[date].foods[food.id].summary.carbs = food.carbs.value * state.log[date].foods[food.id].servings;
            state.log[date].foods[food.id].summary.fat = food.fat.value * state.log[date].foods[food.id].servings;

            state.log[date].summary = getDailySummary(state.log[date]);
            return {
                ...state
            }
        case REMOVE_FOOD_LOG:
            return {initialState};
        case LOG_UPDATE_FOOD:
            let servings = action.payload.servings;

            // If servings is NAN then people must be editing so just let them be
            if (isNaN(servings)) {
                state.log[date].foods[food.id].servings = '';
                return {
                    ...state
                }
            }

            // if servings is 0, then remove the food all together
            if (servings == 0) {
                delete state.log[date].foods[food.id];
                return {
                    ...state
                }
            }

            // Calculate the new servings number
            state.log[date].foods[food.id].servings = servings;
            state.log[date].foods[food.id].summary.calories = food.calories.value * state.log[date].foods[food.id].servings;
            state.log[date].foods[food.id].summary.protine = food.protine.value * state.log[date].foods[food.id].servings;
            state.log[date].foods[food.id].summary.carbs = food.carbs.value * state.log[date].foods[food.id].servings;
            state.log[date].foods[food.id].summary.fat = food.fat.value * state.log[date].foods[food.id].servings;

            state.log[date].summary = getDailySummary(state.log[date]);
            return {
                ...state
            }
        default:
            return state
    }
  }

export const generateLogId = () => {
    return uuid.v4();
}
  
  
export default logReducer;