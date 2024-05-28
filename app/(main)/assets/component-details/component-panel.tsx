'use client';
import React, { useEffect, useState } from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import { Card } from 'primereact/card';
import { componentNavigation } from '@/function/common';
import { AssetsService } from '@/service/AssetData';

const ComponentPanel = () => {
  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    AssetsService.getAllAssets().then(({ companies, component, equipment, units }: any) => {
      const filterEquipment = componentNavigation(equipment, component, 'equipment_id');
      const filterUnit = componentNavigation(units, filterEquipment, 'unit_id');
      const filterCompanies = componentNavigation(companies, filterUnit, 'company_id');
      setAssets(filterCompanies);
    });
  }, []);

  return (
    <Card subTitle="Component Navigation" className="border-round-xl min-h-full shadow-1">
      <PanelMenu model={assets} className="w-full " />
    </Card>
  );
};

export default ComponentPanel;
