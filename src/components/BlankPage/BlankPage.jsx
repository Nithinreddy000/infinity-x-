import React from 'react';
import codeplayerslogo from '../assets/logo.png';
import infinitylogo from '../assets/infinityERP.png';

const BlankPage = () => {
    return (
        <div>
            <div>
                <img src={codeplayerslogo} alt='infinity erp logo'/>
            </div>
            <div>
                <img src={infinitylogo} alt='codeplayers logo'/>
            </div>
            <div>
                <h1>Welcome to the Blank Page</h1>
            </div>
        </div>
    );
};

export default BlankPage;
