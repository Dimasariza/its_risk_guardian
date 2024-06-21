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

export const SaveReducer = (state: boolean = false, {type}: any) => {
    switch(type) {
        case "SAVE_DATA":
            return true;
        case "SAVE_DONE":
            return false;
        default:
            return state;
    }
};

export const EditReducer = (state: boolean = false, {type}: any) => {
    switch(type) {
        case "EDIT_DATA":
            return true;
        case "EDIT_DONE":
            return false;
        default:
            return state
    }
}

export const AuthReducer = (state: any = {login: false}, { type, data }: any ) => {
    switch(type) {
        case "LOGIN":
            return {
                ...state,
                data
            };
        case "LOGOUT":
            return {
                ...state,
                data
            };
        default:
            return state
    }
}