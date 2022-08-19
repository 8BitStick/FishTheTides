import { GET_STATIONS, SEARCH_STATIONS, SET_STATION } from './actions';

const initialState = {
    stations: [],
    station: {}
};

const stationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STATIONS:
            return { ...state, stations: action.payload };
        case SEARCH_STATIONS: {
            const filteredStations = state.stations.filter((station) => 
                station.name.toLowerCase().startsWith(action.payload.toLowerCase()) || station.region.toLowerCase().startsWith(action.payload.toLowerCase()))
            return { ...state, stations: filteredStations };
        } 
        case SET_STATION:
            return { ...state, station: action.payload}
          
        default:
            return state;
    }
}

export default stationsReducer;