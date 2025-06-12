import {createSlice} from "@reduxjs/toolkit";

export type CityListReducerType = {
    citiesList: Array<string>,
}
export const cityListSlice = createSlice(
    {
        name: 'cityList',
        initialState: {
            citiesList: [],
        },
        reducers: {
            addNewCity: (state: CityListReducerType,
                         action) =>
            {
                state.citiesList = [...state.citiesList, action.payload as string];
            }
        }
    }
);

export const {addNewCity} = cityListSlice.actions;
export default cityListSlice.reducer;
