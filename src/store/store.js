import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { persistReducer, persistStore } from 'redux-persist';

import foodReducer from './food/reducer';
import settingReducer from './settings/reducer';
import modalReducer from './modal/reducer';
import logReducer from './log/reducer';

const rootReducer = combineReducers({
    foodReducer,
    settingReducer,
    modalReducer,
    logReducer,
})

const persistConfig = {
    key: 'root',
    blacklist: ['modal'],
    storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const Store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, logger]
})
export const Persistor = persistStore(Store)