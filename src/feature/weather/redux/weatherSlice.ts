import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {getTWeatherWithCityName, getWeatherWithLocation} from "./asyncThunkActions.ts";

export type Weather = {
    cityName: string,
    currentTemperature: string,
}
export type WeatherReducerType = {
    weather?: Weather,
    isLoading: boolean,
    errorMessage: string
}

export const weatherSlice = createSlice({
    name: "weather",
    initialState: {
        weather: undefined,
        isLoading: false,
        errorMessage: ''
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder
            .addMatcher(
                isAnyOf(
                    getTWeatherWithCityName.pending,
                    getWeatherWithLocation.pending
                ),
                (state) => {
                    state.isLoading = true;
                    state.errorMessage = '';
                    state.weather = undefined;
                }
            );
        builder
            .addMatcher(
                isAnyOf(
                    getTWeatherWithCityName.rejected,
                    getWeatherWithLocation.rejected
                ),
                (state) => {
                    state.isLoading = false;
                    state.errorMessage = "Something goes wrong!";
                }
            );
        builder
            .addMatcher(
                isAnyOf(
                    getTWeatherWithCityName.fulfilled,
                    getWeatherWithLocation.fulfilled
                ),
                (state: WeatherReducerType, action) => {
                    state.isLoading = true;
                    state.errorMessage = '';
                    state.weather = action.payload;
                }
            )
    }
});

export default weatherSlice.reducer;
