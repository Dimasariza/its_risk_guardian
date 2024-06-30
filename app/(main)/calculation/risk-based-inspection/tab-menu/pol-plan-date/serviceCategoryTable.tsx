import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Row } from "primereact/row";

function ServiceCategoryTable({visible, setVisible}: any) {
    const headerGroup = (
        <ColumnGroup>
            <Row>
              <Column header="PRD Service Severity" rowSpan={2} />
              <Column header="Characteristic MTTF" rowSpan={2} />
              <Column header="Characteristic of Failure" rowSpan={2} />
              <Column header="Expected Stream Characterization" rowSpan={2}/>
              <Column header="Typical Temperature" rowSpan={2}/>
              <Column header="Examples of Service" rowSpan={2}/>
              <Column header="Conventional and Balanced Bellows PRV" colSpan={2}/>
              <Column header="Pilot-Operated PRV" colSpan={2}/>
              <Column header="Rupture Disk" colSpan={2}/>
            </Row>
            <Row>
              <Column header="β"/>
              <Column header="ɳ def"/>
              <Column header="β"/>
              <Column header="ɳ def"/>
              <Column header="β"/>
              <Column header="ɳ def"/>
            </Row>
        </ColumnGroup>
    );

    const expectedStreamTemplate = (rowData: any) => {
        return (
            rowData.expectedStream.map((i: any, key: number) => {
                return <div key={key}>
                    <span>{i}</span> 
                    <div style={{borderBottom: "1px solid #999", width: "100%"}} className="flex my-3"></div>
                </div>
            })
        )
    }

    const severity = [
        {
            id: 'genericFailure1001',
            service_severity: 'Mild',
            mttf_characteristic: 'Failure is characterized by a long (25 years) MTTF',
            failure_characteristic: 'Failure is strongly characterized as a “wear out” type of failure, in which the failure occurs due to an accumulation of damage over a long period of time.',
            expectedStream: [
                ". Clean hydrocarbon products at moderate temperature",
                ". No aqueous phase present.",
                ".Low in sulfur and chlorides"
            ],
            typical_temperature: 'Low temperature, always << 500°F',
            exampleOfService: 'Examples include: product hydrocarbon streams (including lubricating oils), LPG, BFW, low pressure steam, and clean gasses such as nitrogen and air',
            beta_conventional: 1.8,
            mu_conventional: 17.5,
            beta_pilot: 1.6,
            mu_pilot: 17.5,
            beta_rupture: 1.6,
            mu_rupture: 17.5
        },    
        {
            id: 'genericFailure1002',
            service_severity: 'Moderate',
            mttf_characteristic: 'Failure occurs at an average (15 years) MTTF.',
            failure_characteristic: 'Failure is weakly characterized as a “wear out” type of failure, in which the failure occurs due to an accumulation of damage over a long period of time.',
            expectedStream: [
                ". Hydrocarbons that may contain some particulate matter",
                ". A separate aqueous phase may be present, but is a minor component",
                ". Clean, filtered and treated water may be included in this category",
                ". Some sulfur or chlorides may be present"
            ],
            typical_temperature: 'Up to 500°F (may exist)',
            exampleOfService: 'Examples include: intermediate hydrocarbon streams, in-service lube and seal oils, process water (NOT cooling water or boiler feed water), and medium to high pressure steam',
            beta_conventional: 1.6,
            mu_conventional: 15.5,
            beta_pilot: 1.6,
            mu_pilot: 15.5,
            beta_rupture: 1.6,
            mu_rupture: 17.5
        },   
        {
            id: 'genericFailure1003',
            service_severity: 'Severe',
            mttf_characteristic: 'Failure is characterized as a relatively short (7 years) MTTF.',
            failure_characteristic: 'Failure is characterized as a “random” type of failure, in which the failure can occur due to a variety of mechanisms (such as corrosion or plugging).',
            expectedStream: [
                ". High temperature hydrocarbon streams with significant tendency to foul",
                ". Sulfur and chloride concentrations may be high.",
                ". Monomers processed at any temperature that can polymerize are in this group as well",
                ".  Sometimes included are aqueous solutions of process water, including cooling water."
            ],
            typical_temperature: 'Up to 500°F (may exist)',
            exampleOfService: 'Examples include: intermediate hydrocarbon streams, in-service lube and seal oils, process water (NOT cooling water or boiler feed water), and medium to high pressure steam',
            beta_conventional: 1.6,
            mu_conventional: 13.1,
            beta_pilot: 1.6,
            mu_pilot: 13.1,
            beta_rupture: 1.6,
            mu_rupture: 17.5
        },      
    ]

    return (
        // <Dialog header="Service Severity Categories" visible={visible} style={{ width: '90%' }} maximizable
        // modal onHide={() => {if (!visible) return; setVisible((prev: any) => ({...prev, generic: false})); }} >
            // <div>
                <DataTable 
                    value={severity} 
                    headerColumnGroup={headerGroup} 
                    // rowGroupMode="rowspan" 
                    // sortMode="single"
                    selectionMode={"single"}
                    // tableStyle={{width: "800px"}}
                >
                    {/* <Column selectionMode="single"></Column> */}
                    <Column field="service_severity" bodyStyle={{width: "1rem"}}></Column>
                    <Column field="mttf_characteristic"></Column>
                    <Column field="failure_characteristic"></Column>
                    <Column field="expectedStream" body={expectedStreamTemplate} style={{ maxWidth: '1rem' }}></Column>
                    <Column field="typical_temperature"></Column>
                    <Column field="exampleOfService"></Column>
                    <Column field="beta_conventional"></Column>
                    <Column field="mu_conventional"></Column>
                    <Column field="beta_pilot"></Column>
                    <Column field="mu_pilot"></Column>
                    <Column field="beta_rupture"></Column>
                    <Column field="mu_rupture"></Column>
                </DataTable>
            // </div>
        // {/* </Dialog> */}
    )
}

export default ServiceCategoryTable;