import React from "react";
import {useNavigate} from "react-router-dom";
import {HOME_PAGE} from "../../../router/navigation.ts";

export const StartPage: React.FC = ()=>{
    const navigate = useNavigate();

    const onStartClick = ()=>{
        navigate(HOME_PAGE);
    }
    return (
        <div className={'container-fluid'}>
            <div className={'row-cols-auto'}>
                <div className={'col-12 d-flex min-vh-100 flex-column justify-content-center align-items-center'}>
                    <h1 className={'m-5'}>Welcome to app</h1>
                    <button
                        className={'btn btn-primary'}
                        onClick={onStartClick}
                    >Start using app</button>
                </div>
            </div>
        </div>
    )
}
