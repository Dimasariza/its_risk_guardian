import { TreeNode } from 'primereact/treenode';

export const CompanyService = {
    async getCompanies() {
        const companiesUrl = '/demo/data/companies.json';
        const res = await fetch(companiesUrl, {});

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch Companies data')
        }
        
        const { data } = await res.json();
        return data.map((c: any, cKey: number) => ({...c, key: cKey})) as TreeNode[]
    }
}