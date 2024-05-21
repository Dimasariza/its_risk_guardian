import { MegaMenu } from "primereact/megamenu";

function AppMegaMenu() {
    
    const items = [
        {
            label: 'File',
            // icon: 'pi pi-box',
            items: [
                [
                    {
                        label: 'Living Room',
                        items: [{ label: 'Accessories' }, { label: 'Armchair' }, { label: 'Coffee Table' }, { label: 'Couch' }, { label: 'TV Stand' }]
                    }
                ],
            ]
        },
        {
            label: 'Home',
            // icon: 'pi pi-box',
            // items: [
            //     [
            //         {
            //             label: 'View',
            //             items: [
            //                 { 
            //                     label: 'Asset Register',
            //                     command: () => {
            //                         // Callback to run
            //                         console.log("asset register")
            //                     }
            //                 }, 
            //                 { label: 'Risk Based Inspection' }, 
            //             ]
            //         }
            //     ],
            // ]
        },
        {
            label: 'Create',
            // icon: 'pi pi-mobile',
            items: [
                // [
                //     {
                //         label: 'Computer',
                //         items: [{ label: 'Monitor' }, { label: 'Mouse' }, { label: 'Notebook' }, { label: 'Keyboard' }, { label: 'Printer' }, { label: 'Storage' }]
                //     }
                // ],
                // [
                //     {
                //         label: 'Home Theather',
                //         items: [{ label: 'Projector' }, { label: 'Speakers' }, { label: 'TVs' }]
                //     }
                // ],
                // [
                //     {
                //         label: 'Gaming',
                //         items: [{ label: 'Accessories' }, { label: 'Console' }, { label: 'PC' }, { label: 'Video Games' }]
                //     }
                // ],
                // [
                //     {
                //         label: 'Appliances',
                //         items: [{ label: 'Coffee Machine' }, { label: 'Fridge' }, { label: 'Oven' }, { label: 'Vaccum Cleaner' }, { label: 'Washing Machine' }]
                //     }
                // ]
            ]
        },
        {
            label: 'Tools',
            // icon: 'pi pi-clock',
            // items: [
            //     [
            //         {
            //             label: 'Football',
            //             items: [{ label: 'Kits' }, { label: 'Shoes' }, { label: 'Shorts' }, { label: 'Training' }]
            //         }
            //     ],
            //     [
            //         {
            //             label: 'Running',
            //             items: [{ label: 'Accessories' }, { label: 'Shoes' }, { label: 'T-Shirts' }, { label: 'Shorts' }]
            //         }
            //     ],
            //     [
            //         {
            //             label: 'Swimming',
            //             items: [{ label: 'Kickboard' }, { label: 'Nose Clip' }, { label: 'Swimsuits' }, { label: 'Paddles' }]
            //         }
            //     ],
            //     [
            //         {
            //             label: 'Tennis',
            //             items: [{ label: 'Balls' }, { label: 'Rackets' }, { label: 'Shoes' }, { label: 'Training' }]
            //         }
            //     ]
            // ]
        }
    ];
    
    return (
        <MegaMenu model={items} breakpoint="960px" />
    )
}

export default AppMegaMenu;