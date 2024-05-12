'use client';
import React, { useRef } from 'react';
import ComponentPanel from './component-panel';
import ComponentData from './component-details';


const ComponentDetails = () => {
    return (
        <div className="grid gap-4 min-h-screen py-2">
            <ComponentPanel />
            <ComponentData />
        </div>
    );
};

export default ComponentDetails;
