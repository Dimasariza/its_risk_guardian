'use client';
import React, { useContext, useRef } from 'react';
import ComponentPanel from './component-panel';
import ComponentData from './component-details';
import { LayoutContext } from '@/layout/context/layoutcontext';


const ComponentDetails = () => {
    const { layoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);

    return (
        <div className="grid min-h-screen py-2">
            <div className={layoutState.staticMenuDesktopInactive ? "col-3" : "col-4"}>
                <ComponentPanel />
            </div>
            <div className='col'>
                <ComponentData />
            </div>
        </div>
    );
};

export default ComponentDetails;
