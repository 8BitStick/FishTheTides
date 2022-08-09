import { combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import tidesReducer from './reducers';


const rootReducer = combineReducers({
    tidesReducer,
});

export const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: applyMiddleware(thunk),
                serializableCheck: false,
            }),
})