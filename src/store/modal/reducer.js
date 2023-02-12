import {
    SHOW_FOOD_MODAL,
    HIDE_FOOD_MODAL,
    SHOW_FOOD_SEARCH_MODAL,
    HIDE_FOOD_SEARCH_MODAL
} from './actions'
  
const initialState = {
    showFoodModal: false,
    foodID: false,
    showFoodSearchModal: false
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
        case SHOW_FOOD_SEARCH_MODAL:
            return {
                ...state,
                showFoodSearchModal: true
            }
        case HIDE_FOOD_SEARCH_MODAL:
            return {
                ...state,
                showFoodSearchModal: false
            }
        default:
            return state
    }
  }
  
export default modalReducer;