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
import POFPlanDate from './tab-menu/probability-plan_date';
import POFRBIDate from './tab-menu/probability-rbi_date';

const ComponentData = () => {
    const [tabMenu, setTabMenu] = useState({top: "data", bottom: "general"})
    const tabMenuTemplate = () => {
        if(tabMenu.top == "data") {
            if(tabMenu.bottom == "general")
                return <DataGeneral />
            else if(tabMenu.bottom == "operating")
                return <DataOperating />
            else if(tabMenu.bottom == "inspection")
                return <DataInspection /> 
        }
        else if(tabMenu.top == "other_damages") {
            if(tabMenu.bottom == "damage_factor") 
                return
            else if(tabMenu.bottom == "damage_category")
                return
        }
        else if(tabMenu.top == "probability") {
            if(tabMenu.bottom == "pof_rbi_date")
                return <POFRBIDate />
            else if(tabMenu.bottom == "pof_plan_date")
                return <POFPlanDate />
        }
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
                label: 'Damage Factor',
                command: () => setTabMenu(prev => ({...prev, bottom: "general"}))
            },
            {
                label: 'Damage Category',
                command: () => setTabMenu(prev => ({...prev, bottom: "operating"}))
            },
        ],
        "probability" : [
            {
                label: 'POF RBI Date',
                command: () => setTabMenu(prev => ({...prev, bottom: "pof_rbi_date"}))
            },
            {
                label: 'POF Plan Date',
                command: () => setTabMenu(prev => ({...prev, bottom: "pof_plan_date"}))
            },
        ],
        "consequence" : [
            {
                label: 'On Progress',
                command: () => setTabMenu(prev => ({...prev, bottom: "general"}))
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
            command: () => {
                setTabMenu(prev => ({...prev, top: "probability"}))
                setTabMenuBottom(tab.probability)
            }
        },
        {
            label: 'Consequence',
            disabled: true,
            command: () => setTabMenu(prev => ({...prev, top: "consequence"}))
        },
        {
            label: 'Risk',
            disabled: true,
            command: () => setTabMenu(prev => ({...prev, top: "risk"}))
        },
        {
            label: 'Inspection',
            disabled: true,
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
