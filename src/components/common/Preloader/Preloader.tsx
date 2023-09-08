import React from 'react';
import preloader from "../../../assets/imeges/preloader.gif"

type PreloaderType = {}

export const Preloader = (props:PreloaderType) => {
    return (
        <div>
            <img src={preloader}/>
        </div>
    );
};

