import { GET_TIDES } from './actions';

const initialState = {
    tideDays: [],
};

const tidesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TIDES:
            return { ...state, tideDays: action.payload };
        default:
            return state;
    }
}

export default tidesReducer;