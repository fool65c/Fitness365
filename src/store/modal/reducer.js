import {
    SHOW_FOOD_MODAL,
    HIDE_FOOD_MODAL
} from './actions'
  
const initialState = {
    showFoodModal: false,
    foodID: false
};

function modalReducer (state = initialState, action) {
    switch (action.type) {
        case SHOW_FOOD_MODAL:   
            return {
                ...state,
                showFoodModal: true,
                foodID: action.payload ? action.payload : false
            }
        case HIDE_FOOD_MODAL:
            return {
                ...state,
                showFoodModal: false,
                foodID: false
            }
        default:
            return state
    }
  }
  
export default modalReducer;