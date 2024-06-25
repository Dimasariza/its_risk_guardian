export interface IAssetEquipment {
  eq_itemId?: string;
  eq_tagOfEquipment: string;
  eq_nameOfEquipment: string;
  eq_equipmentType?: string;
  [key: string]: string | string[];
}
