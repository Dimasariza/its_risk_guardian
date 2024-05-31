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

export const AssetData = (state: any, type: any) => {
    switch(type) {
        case "ASSET_DATA":
            return {
                ...state
            };
        default:
            return state;
    }
};