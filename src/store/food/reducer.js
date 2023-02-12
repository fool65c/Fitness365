import uuid from 'react-native-uuid';

import { 
    UPDATE_FOOD,
    DELETE_FOOD,
} from './actions'
  
const initialState = {
    foods: {},
};

export const emptyFood = {
    brandName: '',
    name: '',
    servingSize: {
        value: 0,
        units: ''
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
    }
};
  
function foodReducer (state = initialState, action) {
    switch (action.type) {
        case UPDATE_FOOD:
            if ('id' in action.payload) {
                state.foods[action.payload.id] = action.payload;
            } else {
                action.payload.id = generateFoodID();
                state.foods[action.payload.id] = action.payload;
            }
            
            return {
                ...state
            }
        case DELETE_FOOD:
            delete state.foods[action.payload];
            return {
                ...state
            }
        default:
            return state
    }
  }

export const generateFoodID = () => {
    return uuid.v4();
}
  
export default foodReducer;