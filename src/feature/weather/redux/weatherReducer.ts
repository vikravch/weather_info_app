import type {Reducer, UnknownAction} from "redux";

export type Weather = {
    cityName: string,
    currentTemperature: string,
}
export type WeatherReducerType = {
    weather?: Weather,
    isLoading: boolean,
    errorMessage: string
}

export const getWeatherStarted = ()=> {
    return {type: 'GET_WEATHER_STARTED'}
}

export const getWeatherLoaded =
    (weather: Weather)=> {
    return {type: 'GET_WEATHER_LOADED', payload: weather}
}

export const getWeatherError = ()=> {
    return {type: 'GET_WEATHER_ERROR'}
}

const initValue: WeatherReducerType = {
    weather: undefined,
    isLoading: false,
    errorMessage: ''
}

export const weatherReducer: Reducer = (
    state: WeatherReducerType = initValue,
    action: UnknownAction
)=> {
    switch (action.type) {
        case 'GET_WEATHER_STARTED':
            return {
                ...state,
                weather: undefined,
                isLoading: true,
                errorMessage: ''
            }
        case 'GET_WEATHER_LOADED':
            return {
                ...state,
                weather: action.payload as Weather,
                isLoading: false,
                errorMessage: ''
            }
        case 'GET_WEATHER_ERROR':
            return {
                ...state,
                isLoading: false,
                errorMessage: 'Something goes wrong'
            }
        default: return state;
    }
}
