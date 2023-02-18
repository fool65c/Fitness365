export const LOG_FOOD = 'LOG_FOOD';
export const LOG_UPDATE_FOOD = 'LOG_UPDATE_FOOD';
export const LOG_MEAL = 'LOG_MEAL';
export const REMOVE_FOOD_LOG = 'REMOVE_FOOD_LOG';

export const logFood = (date, food, servingSize) => dispatch => {
    dispatch({
        type: LOG_FOOD,
        payload: {
            date: date,
            food: food,
            servingSize: servingSize
        }
    })
}

export const logUpdateFood = (date, food, servings) => dispatch => {
    dispatch({
      type: LOG_UPDATE_FOOD,
      payload: {
        date: date,
        food: food,
        servings: servings
      }
    })
  }


  
  export const removeLog = (date, logId) => dispatch => {
    dispatch({
      type: REMOVE_FOOD_LOG,
      payload: {
        date: date,
        logId: logId
      }
    });
  }