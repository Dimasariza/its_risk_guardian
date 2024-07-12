"use client"

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import ComponentDialog from "./dialog-equipment/dialog";
import EquipmentDialog from "./dialog-system/dialog";
import ItemDialog from "./dialog-plant/dialog";

function AssetRegister() {
    return (
        <>
            <Card title="Asset Register">
                <div className="w-4 flex justify-content-between">
                    <ItemDialog />
                    <EquipmentDialog />
                    <ComponentDialog />
                </div>
                {/* <TabMenu model={items} />
                {tabMenuView()} */}
            </Card>
        </>
    )
}

export default AssetRegister;