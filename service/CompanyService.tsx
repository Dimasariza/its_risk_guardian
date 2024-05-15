import { TreeNode } from 'primereact/treenode';

export const CompanyService = {
    getCompanies() {
        return fetch(process.env.PUBLIC_URL + '/demo/data/companies.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
        .then((res) => res.json())
        .then((d) => d.data as TreeNode[]);
    }
}