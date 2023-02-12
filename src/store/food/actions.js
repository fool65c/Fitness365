export const UPDATE_FOOD = 'UPDATE_FOOD';
export const DELETE_FOOD = 'DELETE_FOOD';

export const updateFood = (food) => dispatch => {
    dispatch({
      type: UPDATE_FOOD,
      payload: food
    })
  }
  
  export const deleteFood = (food) => dispatch => {
    dispatch({
      type: DELETE_FOOD,
      payload: food
    })
  }