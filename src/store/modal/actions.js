export const SHOW_FOOD_MODAL = 'SHOW_FOOD_MODAL';
export const HIDE_FOOD_MODAL = 'HIDE_FOOD_MODAL';
export const SHOW_FOOD_SEARCH_MODAL = 'SHOW_FOOD_SEARCH_MODAL';
export const HIDE_FOOD_SEARCH_MODAL = 'HIDE_FOOD_SEARCH_MODAL';
export const SHOW_LOG_DETAIL_MODAL = 'SHOW_LOG_DETAIL_MODAL';
export const HIDE_LOG_DETAIL_MODAL = 'HIDE_LOG_DETAIL_MODAL';

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

export const showFoodSearchModal = () => dispatch => {
    dispatch({
        type: SHOW_FOOD_SEARCH_MODAL
    });
}

export const hideFoodSearchModal = () => dispatch => {
    dispatch({
        type: HIDE_FOOD_SEARCH_MODAL
    });
}

export const showLogDetailModal = (date) => dispatch => {
    dispatch({
        type: SHOW_LOG_DETAIL_MODAL,
        payload: date
    });
}

export const hideLogDetailModal = () => dispatch => {
    dispatch({
        type: HIDE_LOG_DETAIL_MODAL
    });
}