export default interface IPOFRBI {
    rbi_fluidService: string
    rbi_typicalTempF: number
    rbi_designType: string
    rbi_discharge: string
    rbi_adjusmentFactor: string
    rbi_serviceSeverity: string
    rbi_envAdjusmentFactor: string
    rbi_inspEffectiveness: string
    rbi_confidenceFactor: string
    rbi_eventFreq: string
    rbi_protectedEquipment: string
    rbi_rbiDate: Date
    severity: any
    adjFactor: any
    weibullParameter: any
    inspEffectiveness: any
    confidence: any
    event: any
    eventFire: any
    eventOverFilling: any
    protected: any
}
 

