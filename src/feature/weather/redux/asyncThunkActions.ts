import {createAsyncThunk} from "@reduxjs/toolkit";
import WeatherApi from "../api/weatherApi.ts";

export const getTWeatherWithCityName =
    createAsyncThunk(
        "getWeatherWithCityName",
        async (cityName: string)=> {
            const weatherString = await WeatherApi.getWeatherByCityName(
                cityName
            );
            const weatherObj = JSON.parse(weatherString);
            return {
                cityName: weatherObj.name,
                currentTemperature: weatherObj.main.temp
            };
        }
);
export type CityLocation = {latitude: number, longitude: number};
export const getWeatherWithLocation =
    createAsyncThunk(
        "getWeatherWithLocation",
        async (location: CityLocation)=> {
            const weatherString = await WeatherApi.getWeatherByLocation(
                location.latitude, location.longitude
            );
            const weatherObj = JSON.parse(weatherString);
            return {
                cityName: weatherObj.name,
                currentTemperature: weatherObj.main.temp
            };
        }
    );
