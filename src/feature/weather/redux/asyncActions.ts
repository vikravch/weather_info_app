import WeatherApi from "../api/weatherApi.ts";
import type {AppDispatch} from "../../../redux/store.ts";
import {getWeatherError, getWeatherLoaded, getWeatherStarted} from "../redux/weatherReducer.ts";

export const getWeatherWithCityName =
    (cityName: string)=> {
    return async (dispatch: AppDispatch)=>{
        try{
            dispatch(getWeatherStarted());
            const weatherString = await WeatherApi.getWeatherByCityName(
                cityName
            );
            const weatherObj = JSON.parse(weatherString);
            dispatch(getWeatherLoaded(
                {
                    cityName: weatherObj.name,
                    currentTemperature: weatherObj.main.temp
                }
            ))
            console.log(weatherString);
        } catch (e) {
            dispatch(getWeatherError());
            console.log(e);
        }
    }
}

export const getWeatherWithLocation =
    (latitude: number, longitude: number)=> {
        return async (dispatch: AppDispatch)=>{
            try{
                dispatch(getWeatherStarted());
                const weatherString = await WeatherApi.getWeatherByLocation(
                    latitude, longitude
                );
                const weatherObj = JSON.parse(weatherString);
                dispatch(getWeatherLoaded(
                    {
                        cityName: weatherObj.name,
                        currentTemperature: weatherObj.main.temp
                    }
                ))
                console.log(weatherString);
            } catch (e) {
                dispatch(getWeatherError());
                console.log(e);
            }

        }
    }
