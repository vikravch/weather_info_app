import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ADD_PAGE} from "../../../router/navigation.ts";
import {useCityListContext} from "../context/CityListContext.tsx";
import {useUserLocation} from "../../../hooks/useCurrentLocation.ts";
import WeatherApi from "../api/weatherApi.ts";

export const HomePage: React.FC = ()=>{
    const navigate = useNavigate();
    const {citiesList} = useCityListContext();
    const { location, permission } = useUserLocation();

    const [currentWeather, setCurrentWeather] = useState('');
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
                WeatherApi.getWeatherByLocation(
                    location.latitude,
                    location.longitude
                ).then((weather)=> setCurrentWeather(weather))
            }
        } else {
            WeatherApi.getWeatherByCityName(
                selectedCity
            ).then((weather)=> setCurrentWeather(weather))
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
                    {currentWeather+" "+permission+" - "+location?.latitude+" "+location?.longitude || 'No weather available'}
                </div>
            </div>
        </div>
    )
}
