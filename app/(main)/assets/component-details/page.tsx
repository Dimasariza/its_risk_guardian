'use client';
import React, { useRef } from 'react';
import ComponentPanel from './component-panel';
import ComponentData from './component-details';


const ComponentDetails = () => {
    return (
        <div className="grid min-h-screen py-2">
            <div className='col-4'>
                <ComponentPanel />
            </div>
            <div className='col'>
                <ComponentData />
            </div>
        </div>
    );
};

export default ComponentDetails;
