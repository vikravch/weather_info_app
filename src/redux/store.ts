import {combineReducers, configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";
import {cityListReducer} from "../feature/weather/redux/cityListReducer.ts";
import {weatherReducer} from "../feature/weather/redux/weatherReducer.ts";

export const store =
    configureStore({
        reducer: combineReducers(
            {
                cityList: cityListReducer,
                weatherData: weatherReducer,
            }
        ),
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== 'production',
    })
    /*createStore(
        combineReducers(
            {
               cityList: cityListReducer,
               weatherData: weatherReducer,
            }
        ), applyMiddleware(
            thunk, logger)
);*/

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
