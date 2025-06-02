import React, {useRef} from "react";
import {useCityListContext} from "../context/CityListContext.tsx";
import {useNavigate} from "react-router-dom";
import {HOME_PAGE} from "../../../router/navigation.ts";

export const AddCityPage: React.FC = () => {
    const navigate = useNavigate();
    const cityInput = useRef<HTMLInputElement>(null);
    const {addNewCity} = useCityListContext();

    const onAddCityClick = () => {
        const inputCityValue = cityInput.current?.value || '';
        console.log('Value from input - ', inputCityValue);
        addNewCity(inputCityValue);
        navigate(`/${HOME_PAGE}`);
    }
    return (
        <div className={'container-fluid'}>
            <div className={'row-cols-auto'}>
                <div className={'col-12 d-flex min-vh-100 flex-column justify-content-center align-items-center'}>
                    <h1 className={'m-5'}>Add new city</h1>

                    <input
                        type="text"
                        className={'form-control mb-3 w-25'}
                        placeholder={'City name'}
                        ref={cityInput}
                    />
                    <button
                        className={'btn btn-primary'}
                        onClick={onAddCityClick}
                    >Add city
                    </button>
                </div>
            </div>
        </div>
    )
}
