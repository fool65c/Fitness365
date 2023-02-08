import { 
    SET_PROTINE_GOAL,
    SET_CARB_GOAL,
    SET_FAT_GOAL,
    SET_MEALS_PER_DAY,
    SET_USDA_API_KEY
  } from './actions'
  
  const initialState = {
    dailyGoals: {
        protine: 0,
        carbs: 0,
        fat: 0
    },
    mealCount: 0,
    USDAAPIKey: null,
  };
  
  function settingReducer (state = initialState, action) {
    switch (action.type) {
        case SET_PROTINE_GOAL:     
            return {
                ...state,
                dailyGoals: {
                    ...state.dailyGoals,
                    protine: action.payload
                }
            }
        case SET_CARB_GOAL:
            return {
                ...state,
                dailyGoals: {
                    ...state.dailyGoals,
                    carbs: action.payload
                }
            }
        case SET_FAT_GOAL:
            return {
                ...state,
                dailyGoals: {
                    ...state.dailyGoals,
                    fat: action.payload
                }
            }
        case SET_MEALS_PER_DAY:
            return {
                ...state,
                mealCount: action.payload
            };
        case SET_USDA_API_KEY:
            return {
                ...state,
                USDAAPIKey: action.payload
            }  
      default:
        return state
    }
  }
  
  export default settingReducer;