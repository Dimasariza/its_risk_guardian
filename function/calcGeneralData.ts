export const calcGeneralData = (name: string, inputValue: any, setValue: any) => {
    switch(name) {
        case "gData_designPressureBar":
          setValue((prev: any) => ({...prev, gData_designPressurePsi: (inputValue * 14.504).toFixed(4)}))
          break
        case "gData_designPressurePsi":
          setValue((prev: any) => ({...prev, gData_designPressureBar: (inputValue / 14.504).toFixed(4)}))
          break
        case "gData_designTemperatureC":
          setValue((prev: any) => ({...prev, gData_designTemperatureR: (inputValue * 0.8).toFixed(4)}))
          setValue((prev: any) => ({...prev, gData_designTemperatureF: (inputValue * 1.8 + 32).toFixed(4)}))
          setValue((prev: any) => ({...prev, gData_designTemperatureK: (inputValue + 273.15).toFixed(4) }))
          break
        case "gData_designTemperatureR":
          setValue((prev: any) => ({...prev, gData_designTemperatureC: (inputValue / 0.8).toFixed(4)}))
          setValue((prev: any) => ({...prev, gData_designTemperatureF: (inputValue / 0.8 * 1.8 + 32).toFixed(4)}))
          setValue((prev: any) => ({...prev, gData_designTemperatureK: (inputValue / 0.8 + 273.15).toFixed(4) }))
          break
        case "gData_designTemperatureF":  
          setValue((prev: any) => ({...prev, gData_designTemperatureC: ((inputValue - 32) / 1.8).toFixed(4)}))
          setValue((prev: any) => ({...prev, gData_designTemperatureR: ((inputValue - 32) * 4 / 9).toFixed(4)}))
          setValue((prev: any) => ({...prev, gData_designTemperatureK: ((inputValue - 32) / 1.8 + 273.15).toFixed(4) }))
          break
        case "gData_designTemperatureK":  
          setValue((prev: any) => ({...prev, gData_designTemperatureC: (inputValue - 273.15).toFixed(4)}))
          setValue((prev: any) => ({...prev, gData_designTemperatureR: ((inputValue - 273.15) * 0.8).toFixed(4)}))
          setValue((prev: any) => ({...prev, gData_designTemperatureF: ((inputValue - 273.15) * 1.8 + 32).toFixed(4) }))
          break
        case "gData_operatingPressureBar":
          setValue((prev: any) => ({...prev, gData_operatingPressurePsi: (inputValue * 14.504).toFixed(4)}))
          break;
        case "gData_operatingPressurePsi":
          setValue((prev: any) => ({...prev, gData_operatingPressureBar: (inputValue / 14.504).toFixed(4)}))
          break;
        case "gData_operatingTemperatureC":
          setValue((prev: any) => ({...prev, gData_operatingTemperatureR: (inputValue * 0.8).toFixed(4)}))
          setValue((prev: any) => ({...prev, gData_operatingTemperatureF: (inputValue * 1.8 + 32).toFixed(4)}))
          setValue((prev: any) => ({...prev, gData_operatingTemperatureK: (inputValue + 273.15).toFixed(4) }))
          break
        case "gData_operatingTemperatureR":
          setValue((prev: any) => ({...prev, gData_operatingTemperatureC: (inputValue / 0.8).toFixed(4)}))
          setValue((prev: any) => ({...prev, gData_operatingTemperatureF: (inputValue / 0.8 * 1.8 + 32).toFixed(4)}))
          setValue((prev: any) => ({...prev, gData_operatingTemperatureK: (inputValue / 0.8 + 273.15).toFixed(4) }))
          break
        case "gData_operatingTemperatureF":  
          setValue((prev: any) => ({...prev, gData_operatingTemperatureC: ((inputValue - 32) / 1.8).toFixed(4)}))
          setValue((prev: any) => ({...prev, gData_operatingTemperatureR: ((inputValue - 32) * 4 / 9).toFixed(4)}))
          setValue((prev: any) => ({...prev, gData_operatingTemperatureK: ((inputValue - 32) / 1.8 + 273.15).toFixed(4) }))
          break
        case "gData_operatingTemperatureK":  
          setValue((prev: any) => ({...prev, gData_operatingTemperatureC: (inputValue - 273.15).toFixed(4)}))
          setValue((prev: any) => ({...prev, gData_operatingTemperatureR: ((inputValue - 273.15) * 0.8).toFixed(4)}))
          setValue((prev: any) => ({...prev, gData_operatingTemperatureF: ((inputValue - 273.15) * 1.8 + 32).toFixed(4) }))
          break
        case "gData_vesselVolumeLB":
          setValue((prev: any) => ({...prev, gData_vesselVolumeKG: (inputValue * 16.01846).toFixed(4)}))
          break;
        case "gData_vesselVolumeKG":
          setValue((prev: any) => ({...prev, gData_vesselVolumeLB: (inputValue / 16.01846).toFixed(4)}))
          break;
        case "gData_corrosionAllowanceMM":
          setValue((prev: any) => ({...prev, gData_corrosionAllowanceInch: (inputValue * 0.03937).toFixed(4)}))
          break;
        case "gData_corrosionAllowanceInch":
          setValue((prev: any) => ({...prev, gData_corrosionAllowanceMM: (inputValue / 0.03937).toFixed(4)}))
          break;
        case "gData_outerDiameterMM":
          setValue((prev: any) => ({...prev, gData_outerDiameterInch: (inputValue * 0.03937).toFixed(4)}))
          break;
        case "gData_outerDiameterInch":
          setValue((prev: any) => ({...prev, gData_outerDiameterMM: (inputValue / 0.03937).toFixed(4)}))
          break;
        case "gData_allowableStressPsig":
          setValue((prev: any) => ({...prev, gData_allowableStressBar: (inputValue * 0.0689476).toFixed(4)}))
          setValue((prev: any) => ({...prev, gData_allowableStressKpa: (inputValue * 6.89476).toFixed(4)}))
          break;
        case "gData_allowableStressBar":
          setValue((prev: any) => ({...prev, gData_allowableStressPsig: (inputValue / 0.0689476).toFixed(4)}))
          setValue((prev: any) => ({...prev, gData_allowableStressKpa: (inputValue / 0.0689476 * 6.89476).toFixed(4)}))
          break;
        case "gData_allowableStressKpa":
          setValue((prev: any) => ({...prev, gData_allowableStressPsig: (inputValue / 6.89476).toFixed(4)}))
          setValue((prev: any) => ({...prev, gData_allowableStressBar: (inputValue / 6.89476 * 0.0689476).toFixed(4)}))
          break;
        case "gData_shellMinimumThicknessMM":
          setValue((prev: any) => ({...prev, gData_shellMinimumThicknessInch: (inputValue * 0.03937).toFixed(4)}))
          break;
        case "gData_shellMinimumThicknessInch":
          setValue((prev: any) => ({...prev, gData_shellMinimumThicknessMM: (inputValue / 0.03937).toFixed(4)}))
          break;
        case "gData_shellCorrosionRateMM":
          setValue((prev: any) => ({...prev, gData_shellCorrosionRateInch: (inputValue * 0.03937).toFixed(4)}))
          break;
        case "gData_shellCorrosionRateInch":
          setValue((prev: any) => ({...prev, gData_shellCorrosionRateMM: (inputValue / 0.03937).toFixed(4)}))
          break;
        case "gData_shellTreqInch":
          setValue((prev: any) => ({...prev, gData_shellTreqMM: (inputValue / 0.03937).toFixed(4)}))
          break;
        case "gData_shellTreqMM":
          setValue((prev: any) => ({...prev, gData_shellTreqInch: (inputValue * 0.03937).toFixed(4)}))
          break;
        case "gData_headMinimumThicknessMM":
          setValue((prev: any) => ({...prev, gData_headMinimumThicknessInch: (inputValue * 0.03937).toFixed(4)}))
          break;
        case "gData_headMinimumThicknessInch":
          setValue((prev: any) => ({...prev, gData_headMinimumThicknessMM: (inputValue / 0.03937).toFixed(4)}))
          break;
        case "gData_headCorrosionRateMM":
          setValue((prev: any) => ({...prev, gData_headCorrosionRateInch: (inputValue * 0.03937).toFixed(4)}))
          break;
        case "gData_headCorrosionRateInch":
          setValue((prev: any) => ({...prev, gData_headCorrosionRateMM: (inputValue / 0.03937).toFixed(4)}))
          break;
        case "gData_headTreqInch":
          setValue((prev: any) => ({...prev, gData_headTreqMM: (inputValue / 0.03937).toFixed(4)}))
          break;
        case "gData_headTreqMM":
          setValue((prev: any) => ({...prev, gData_headTreqInch: (inputValue * 0.03937).toFixed(4)}))
          break;
    }
}