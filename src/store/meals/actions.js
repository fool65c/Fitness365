export const UPDATE_MEAL = 'UPDATE_MEAL';
export const DELETE_MEAL = 'DELETE_MEAL';

export const updateMeal = (meal) => dispatch => {
    dispatch({
      type: UPDATE_MEAL,
      payload: meal
    })
  }
  
  export const deleteMeal = (mealId) => dispatch => {
    dispatch({
      type: DELETE_MEAL,
      payload: mealId
    })
  }