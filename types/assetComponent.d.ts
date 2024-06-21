export interface IAssetComponent {
  comp_equipmentId?: string;
  comp_tagOfComponent: string;
  comp_nameOfComponent: string;
  comp_componentType: string;
  [key: string]: string | string[];
}
