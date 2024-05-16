import { reconstructData } from "@/function/common";
import { CompanyService } from "./CompanyService";

export const UnitsService = {
  async getUnits() {
    const unitsUrl = '/demo/data/units.json';
    const res = await fetch(unitsUrl, {});
    const companies: any = await CompanyService.getCompanies();

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch Companies data')
    }

    const { data } = await res.json();

    return reconstructData(companies, data, "company_id", "asd") 
  }
}