export const SHOW_FOOD_MODAL = 'SHOW_FOOD_MODAL';
export const HIDE_FOOD_MODAL = 'HIDE_FOOD_MODAL';

export const showFoodModal = (foodID) => dispatch => {
    dispatch({
      type: SHOW_FOOD_MODAL,
      payload: foodID
    })
  }
  
  export const hideFoodModal = (food) => dispatch => {
    dispatch({
      type: HIDE_FOOD_MODAL
    })
  }