export default interface IPOFPlan {
    plan_fluidService: string
    plan_typicalTempF: number
    plan_designType: string
    plan_discharge: string
    plan_adjusmentFactor: string
    plan_serviceSeverity: string
    plan_envAdjusmentFactor: string
    plan_inspEffectiveness: string
    plan_confidenceFactor: string
    plan_eventFreq: string
    plan_protectedEquipment: string
    plan_planDate: Date
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
 

