export const UnitsService = {
    async getUnits() {
        const companyUrl = '/demo/data/companies.json';
        const unitUrl = '/demo/data/units.json';
        const [fetchCompanies, fetchUnits] = await Promise.all([
          fetch(process.env.PUBLIC_URL + companyUrl), 
          fetch(process.env.PUBLIC_URL + unitUrl)
        ]);
        const [{data: companies}, {data: units}] = await Promise.all([
          fetchCompanies.json(), 
          fetchUnits.json()
        ]);

        return { companies, units };
    },
    async getCompaniesUnits() {
      const {companies, units}: any = await this.getUnits();

      return companies.map((company: any) => {
        const children = units.filter((u: any) => u.data.company_id == company.data.id)
        return {
            ...company,
            children
        }
      })
    }
}