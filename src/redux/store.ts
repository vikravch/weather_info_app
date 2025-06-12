import {applyMiddleware, combineReducers, createStore} from "redux";
import {cityListReducer} from "../feature/weather/redux/cityListReducer.ts";
import {weatherReducer} from "../feature/weather/redux/weatherReducer.ts";
import {thunk} from "redux-thunk";
import logger from "redux-logger";

export const store =
    createStore(
        combineReducers(
            {
               cityList: cityListReducer,
               weatherData: weatherReducer,
            }
        ), applyMiddleware(
            thunk, logger)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
