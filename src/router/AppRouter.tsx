import React from "react";
import {Route, Routes} from "react-router-dom";
import {StartPage} from "../feature/weather/pages/StartPage.tsx";
import * as RoutePath from './navigation';
import {AddCityPage} from "../feature/weather/pages/AddCityPage.tsx";
import {HomePage} from "../feature/weather/pages/HomePage.tsx";

export const AppRouter: React.FC = ()=>{
    return (
        <Routes>
            <Route path={'/'} element={<StartPage/>} />
            <Route path={`/${RoutePath.ADD_PAGE}`} element={<AddCityPage/>}/>
            <Route path={`/${RoutePath.HOME_PAGE}`} element={<HomePage/>}/>
        </Routes>
    )
}
