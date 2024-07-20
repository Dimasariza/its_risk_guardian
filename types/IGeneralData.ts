export default interface IGeneralData {
    gData_tagNumber: string
    gData_service: string
    gData_manufacturedBy: string
    gData_positionType: string
    gData_shapeType: string
    gData_geometryData: string
    gData_code: string
    gData_designPressureBar: number
    gData_designPressurePsi: number
    gData_designTemperatureC: number
    gData_designTemperatureK: number
    gData_designTemperatureR: number
    gData_designTemperatureF: number
    gData_operatingPressureBar: number
    gData_operatingPressurePsi: number
    gData_operatingTemperatureC: number
    gData_operatingTemperatureR: number
    gData_operatingTemperatureF: number
    gData_operatingTemperatureK: number
    gData_dimensionLength: number
    gData_dimensionWidth: number
    gData_vesselVolumeLB: number
    gData_vesselVolumeKG: number
    gData_support: number
    gData_jointEfficiency: number
    gData_yieldStrength: number
    gData_tensileStrength: number
    gData_corrosionAllowanceMM: number
    gData_corrosionAllowanceInch: number
    gData_startingDate: Date
    // gData_yearBuilt: number
    gData_allowableOverPress: number
    gData_setPressurePsig: number
    gData_material: string
    gData_lastInspection: string
    gData_outerDiameterMM: number
    gData_outerDiameterInch: number
    gData_allowableStressPsig: number
    gData_allowableStressBar: number
    gData_allowableStressKpa: number
    gData_efficiency: number
    gData_shellCode: string
    gData_shellMinimumThicknessMM: number
    gData_shellMinimumThicknessInch: number
    gData_shellCorrosionRateMM: number
    gData_shellCorrosionRateInch: number
    gData_shellTreqInch: number
    gData_shellTreqMM: number
    gData_shellMAWP: number
    gData_headCode: string
    gData_headMinimumThicknessMM: number
    gData_headMinimumThicknessInch: number
    gData_headCorrosionRateMM: number
    gData_headCorrosionRateInch: number
    gData_headTreqInch: number
    gData_headTreqMM: number
    gData_headMAWP: number
}