import { TreeNode } from 'primereact/treenode';

export const UnitsService = {
    getUnits() {
        return fetch(process.env.PUBLIC_URL + '/demo/data/units.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
        .then((res) => res.json())
        .then((d) => d.data as TreeNode[]);
    }
}