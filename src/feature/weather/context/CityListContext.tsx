import React, {createContext, type PropsWithChildren, useContext, useState} from "react";

type CityListContextType = {
    citiesList: Array<string>,
    addNewCity: (cityName: string)=>void,
}
const initValue: CityListContextType = {
    citiesList: [],
    addNewCity: ()=>{}
}

const CityListContext =
    createContext<CityListContextType>(initValue);

export const CityListContextWrapper: React.FC<PropsWithChildren> =
    ({children})=>{

        const [cityList, setCityList] = useState<Array<string>>([]);
        const addNewCity = (newCity: string)=>{
            setCityList([newCity, ...cityList])
        }

        return <CityListContext.Provider value={
            {
                citiesList: cityList,
                addNewCity: addNewCity
            }
        }>{children}</CityListContext.Provider>
}

export const useCityListContext = ()=> {
    return useContext(CityListContext)
}
