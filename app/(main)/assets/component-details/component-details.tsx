'use client';
import React, { useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { TabMenu } from 'primereact/tabmenu';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from 'primereact/button';
import DataGeneral from './tab-menu/data-general';
import DataOperating from './tab-menu/data-operaing';
import DataInspection from './tab-menu/data-inspection';

const ComponentData = () => {
    const [tabMenu, setTabMenu] = useState({top: "data", bottom: "general"})
    const tabMenuTemplate = () => {
        if(tabMenu.top == "data" && tabMenu.bottom == "general")
        return <DataGeneral />
        else if(tabMenu.top == "data" && tabMenu.bottom == "operating")
        return <DataOperating />
        else if(tabMenu.top == "data" && tabMenu.bottom == "inspection")
        return <DataInspection />
    }

    const tab = 
    {
        "data" : [
            {
                label: 'General',
                command: () => setTabMenu(prev => ({...prev, bottom: "general"}))
            },
            {
                label: 'Operating Conditions',
                command: () => setTabMenu(prev => ({...prev, bottom: "operating"}))
            },
            {
                label: 'Inspection',
                command: () => setTabMenu(prev => ({...prev, bottom: "inspection"}))
            },
        ],
        "other_damages" : [
            {
                label: 'Test1',
                command: () => setTabMenu(prev => ({...prev, bottom: "general"}))
            },
            {
                label: 'Test 2',
                command: () => setTabMenu(prev => ({...prev, bottom: "operating"}))
            },
            {
                label: 'Test 3',
                command: () => setTabMenu(prev => ({...prev, bottom: "inspection"}))
            },
        ],
    }

    const [tabMenuBottom, setTabMenuBottom] = useState(tab.data)

    const tabMenuTop = [
        {
            label: 'Data',
            command: () => {
                setTabMenu(prev => ({...prev, top: "data"}))
                setTabMenuBottom(tab.data)
            }
        },
        {
            label: 'Other Damages',
            command: () => { 
                setTabMenu(prev => ({...prev, top: "other_damages"}))
                setTabMenuBottom(tab.other_damages)
            }
        },
        {
            label: 'Probability',
            command: () => setTabMenu(prev => ({...prev, top: "probability"}))
        },
        {
            label: 'Consequence',
            command: () => setTabMenu(prev => ({...prev, top: "consequence"}))
        },
        {
            label: 'Risk',
            command: () => setTabMenu(prev => ({...prev, top: "risk"}))
        },
        {
            label: 'Inspection',
            command: () => setTabMenu(prev => ({...prev, top: "inspection"}))
        },
    ];



    return (
        <Card subTitle="Data" className="shadow-1 border-round-xl">
            <TabMenu model={tabMenuTop} />
            <TabMenu model={tabMenuBottom} />
            <div className="p-3">
                {tabMenuTemplate()}
            </div>
        </Card>
    );
};

export default ComponentData;
