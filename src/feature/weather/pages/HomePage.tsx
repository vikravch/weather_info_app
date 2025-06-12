import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ADD_PAGE} from "../../../router/navigation.ts";
//import {useCityListContext} from "../context/CityListContext.tsx";
import {useUserLocation} from "../../../hooks/useCurrentLocation.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../redux/store.ts";
import {type CityListReducerType} from "../redux/cityListReducer.ts";
import type {WeatherReducerType} from "../redux/weatherReducer.ts";
import {getWeatherWithCityName, getWeatherWithLocation} from "../redux/asyncActions.ts";

export const HomePage: React.FC = ()=>{
    const navigate = useNavigate();
    const {citiesList} = useSelector<RootState, CityListReducerType>(
        state => state.cityList
    )
    const { location, permission } = useUserLocation();

    //const [currentWeather, setCurrentWeather] = useState('');
    const {weather} = useSelector<RootState, WeatherReducerType>(
        state=> state.weatherData
    );
    const dispatch =
        useDispatch<AppDispatch>();

    const [selectedCity, setSelectedCity] = useState('');

    const onClickAddCity = ()=>{
        navigate(`/${ADD_PAGE}`);
    }
    const onClickOnCity = (newCityName: string) => {
        setSelectedCity(newCityName);
    }

    /*useEffect(()=>{
        if (location != null) {
            WeatherApi.getWeatherByLocation(
                location.latitude,
                location.longitude
            ).then((weather)=> setCurrentWeather(weather))
        }
    }, [location]);*/

    useEffect(() => {
        if (selectedCity == ''){
            if (location != null) {
                /*WeatherApi.getWeatherByLocation(
                    location.latitude,
                    location.longitude
                ).then((weather)=> setCurrentWeather(weather))*/
                dispatch(getWeatherWithLocation(
                    location.latitude,
                    location.longitude
                ))
            }
        } else {
            /*WeatherApi.getWeatherByCityName(
                selectedCity
            ).then((weather)=> setCurrentWeather(weather))*/
            dispatch(getWeatherWithCityName(selectedCity));
        }
    }, [selectedCity, location]);

    return (
        <div className={'container'}>
            <div className={'row'}>
                <div className={'col-12 col-sm-3 bg-info min-sm-vh-100 p-2'}>
                    <ul className={'list-inline'}>
                        <li className={'d-flex'}>
                            <p className={'flex-grow-1'}>Cities:</p>
                            <p onClick={onClickAddCity}>+</p>
                        </li>

                        <li className={'text-center '+(selectedCity=='' && ' bg-danger text-white')}
                            onClick={()=> onClickOnCity('')}>
                            Current location
                        </li>
                        {
                            citiesList.map((cityName)=> {
                                return (
                                <li
                                    className={
                                    'text-center '+(selectedCity==cityName && ' bg-danger text-white')}
                                    onClick={()=> onClickOnCity(cityName)}>
                                    {cityName}
                                </li>)
                            })
                        }
                    </ul>
                </div>
                <div className={'col-12 col-sm-9 bg-primary min-vh-100 p-3'}>
                    {JSON.stringify(weather)+" "+permission+" - "+location?.latitude+" "+location?.longitude || 'No weather available'}
                </div>
            </div>
        </div>
    )
}
