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
                action.payload.id = generateFoodID(action.payload.brandName + action.payload.name);
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

export const generateFoodID = (string) => {
    var h = 0, l = string.length, i = 0;
    if ( l > 0 )
        while (i < l)
            h = (h << 5) - h + string.charCodeAt(i++) | 0;
        return h;
    } 
  
export default foodReducer;