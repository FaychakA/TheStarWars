import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import './Spinner.scss';

const Spinner = () => {
    return (
        <div className="spinner">
            <PropagateLoader />
        </div>
    );
};

export default Spinner;
