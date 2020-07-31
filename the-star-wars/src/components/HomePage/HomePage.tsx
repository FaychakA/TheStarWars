import React from 'react';
import Films from "../Films/Films";
import {useSelector} from "react-redux";

import {filmsSelector} from '../../Redux/reducers';

const HomePage = () => {
    const films = useSelector(filmsSelector);

    return (
        <div>
            <Films data={films.data}/>
        </div>
    );
};

export default HomePage;
