import uuid from 'react-native-uuid';

import { 
    UPDATE_MEAL,
    DELETE_MEAL,
} from './actions'
  
const initialState = {
    meals: {},
};

export const emptyMeal = {
    date: '',
    servingSize: {
        value: 1,
        units: 'each'
    },
    calories: {
        value: 0,
        units: 'KCAL'
    },
    protine: {
        value: 0,
        units: 'G'
    },
    carbs: {
        value: 0,
        units: 'G'
    },
    fat: {
        value: 0,
        units: 'G'
    },
    foods: {}
};
  
function mealReducer (state = initialState, action) {
    switch (action.type) {
        case UPDATE_MEAL:
            if ('id' in action.payload) {
                state.meals[action.payload.id] = action.payload;
            } else {
                action.payload.id = generateMealID();
                state.meals[action.payload.id] = action.payload;
            }

            console.log(state.meals)
            
            return {
                ...state
            }
        case DELETE_MEAL:
            delete state.meals[action.payload];
            return {
                ...state
            }
        default:
            return state
    }
  }

export const generateMealID = () => {
    return uuid.v4();
}
  
export default mealReducer;