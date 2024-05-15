export const EquipmentService = {
    async getEquipment() {
        const equipmentUrl = '/demo/data/equipment.json';
        const res = await fetch(equipmentUrl)

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch Equipment data')
        }

        return res.json()

        // return { companies, units };
    }
}