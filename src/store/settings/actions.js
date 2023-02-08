export const SET_PROTINE_GOAL = 'SET_PROTINE_GOAL';
export const SET_CARB_GOAL = 'SET_CARB_GOAL';
export const SET_FAT_GOAL = 'SET_FAT_GOAL';
export const SET_MEALS_PER_DAY = 'SET_MEALS_PER_DAY';
export const SET_USDA_API_KEY = 'SET_USDA_API_KEY';

export const setProtineGoal = protine => dispatch => {
  dispatch({
        type: SET_PROTINE_GOAL,
        payload: protine,
    });
};

export const setCarbGoal = carb => dispatch => {
    dispatch({
        type: SET_CARB_GOAL,
        payload: carb,
    });
};

export const setFatGoal = fat => dispatch => {
    dispatch({
        type: SET_FAT_GOAL,
        payload: fat,
    });
};

export const setMealsPerDay = mealCount => dispatch => {
    dispatch({
        type: SET_MEALS_PER_DAY,
        payload: mealCount,
    });
}

export const setUDSAAPIKey = (apiKey) => dispatch => {
    dispatch({
        type: SET_USDA_API_KEY,
        payload: apiKey,
    });
}