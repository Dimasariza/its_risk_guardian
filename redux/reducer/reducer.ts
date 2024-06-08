export const Reducer = (state: any = {menu: ""}, {type, menu}: any) => {
    switch(type){
        case "MENU_ITEM":
            return {
                ...state,
                menu,
            };
        default:
            return state;
    }
};

export const RerenderMenu = (state: any = {rerender: false}, { type }: any) => {
    switch(type) {
        case "RERENDER_MENU":
            return {
                ...state,
                rerender: true,
            };
        default:
            return state;
    }
};

export const AssetData = (state: any, type: string) => {
    switch(type) {
        case "ASSET_DATA":
            return {
                ...state
            };
        default:
            return state;
    }
};

export const SaveData = (state: boolean = false, {type, save}: any) => {
    switch(type) {
        case "SAVE_DATA":
            console.log(save)
            return { state: save };
        default:
            return state;
    }
}