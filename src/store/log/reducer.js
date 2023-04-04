import uuid from 'react-native-uuid';

import { 
    LOG_FOOD,
    LOG_UPDATE_FOOD,
    LOG_MEAL,
    LOG_UPDATE_MEAL,
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

const calculateEntrySummary = (entry, servings) => {
    console.log('....................>MAGER',entry)
    return {
        calories: entry.calories.value * servings,
        protine: entry.protine.value * servings,
        carbs: entry.carbs.value * servings,
        fat: entry.fat.value * servings
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
        summary.calories += food.summary.calories;
        summary.protine += food.summary.protine;
        summary.carbs += food.summary.carbs;
        summary.fat += food.summary.fat;
    })

    Object.values(day.meals).forEach(meal => {
        console.log('.................>>>>>>WAT.............', meal)
        summary.calories += meal.summary.calories;
        summary.protine += meal.summary.protine;
        summary.carbs += meal.summary.carbs;
        summary.fat += meal.summary.fat;
    })

    return summary;
}

const init_day = (date, state) => {
    if (!(date in state.log)) {
        state.log[date] = defaultLogEntry;
        state.log[date].date = date;
    }
    return state;
}
  
function logReducer (state = initialState, action) {
    let date = action.payload ? action.payload.date : false;
    let food = action.payload ? action.payload.food : false;
    let meal = action.payload ? action.payload.meal : false;
    let servingSize = action.payload ? action.payload.servingSize : false;
    let servings = action.payload ? action.payload.servings : false;
    switch (action.type) {
        case LOG_FOOD:
            state = init_day(date, state);

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
            state.log[date].foods[food.id].summary = calculateEntrySummary(
                food,
                state.log[date].foods[food.id].servings
            )

            state.log[date].summary = getDailySummary(state.log[date]);
            return {
                ...state
            }
        case REMOVE_FOOD_LOG:
            return {initialState};
        case LOG_UPDATE_FOOD:
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
            state.log[date].foods[food.id].summary = calculateEntrySummary(
                food,
                state.log[date].foods[food.id].servings
            )

            state.log[date].summary = getDailySummary(state.log[date]);
            return {
                ...state
            }
        case LOG_MEAL:
            state = init_day(date, state);
            if (!(meal.id in state.log[date].meals)) {
                state.log[date].meals[meal.id] = {
                    mealId: meal.id,
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
            state.log[date].meals[meal.id].servings += servingSize;
            state.log[date].meals[meal.id].summary = calculateEntrySummary(
                meal,
                state.log[date].meals[meal.id].servings
            )

            state.log[date].summary = getDailySummary(state.log[date]);

            return {
                ...state
            }
            case LOG_UPDATE_MEAL:
                // If servings is NAN then people must be editing so just let them be
                if (isNaN(servings)) {
                    state.log[date].meals[meal.id].servings = '';
                    return {
                        ...state
                    }
                }
    
                // if servings is 0, then remove the food all together
                if (servings == 0) {
                    delete state.log[date].mesal[meal.id];
                    return {
                        ...state
                    }
                }
    
                // Calculate the new servings number
                state.log[date].meals[meal.id].servings = servings;
                state.log[date].meals[meal.id].summary = calculateEntrySummary(
                    meal,
                    state.log[date].meals[meal.id].servings
                )
    
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