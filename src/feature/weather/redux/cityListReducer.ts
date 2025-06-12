import type {Reducer, UnknownAction} from "redux";

export type CityListReducerType = {
    citiesList: Array<string>,
}

const initValue: CityListReducerType = {
    citiesList: [],
}

export const addNewCity = (cityName: string)=>{
    return {type: 'ADD_NEW_CITY', payload: cityName}
}

export const cityListReducer: Reducer = (
    state : CityListReducerType = initValue,
    action : UnknownAction,
): CityListReducerType => {

    switch (action.type) {
        case 'ADD_NEW_CITY': return {
            citiesList: [...state.citiesList, action.payload as string]
        };
        default:
            return state;
    }

}
