import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tidesReducer from './reducers';
const rootReducer = combineReducers({
    tidesReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
