import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./router/AppRouter.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {CityListContextWrapper} from "./feature/weather/context/CityListContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <CityListContextWrapper>
            <AppRouter/>
        </CityListContextWrapper>
    </BrowserRouter>
  </StrictMode>,
)
