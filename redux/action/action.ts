export const MenuItem = (menu: string) => {
    return {
        type: "MENU_ITEM",
        menu
    }
}

export const RerenderMenu = () => {
    return {
        type: "RERENDER_MENU"
    }
}

export const AssetData = () => {
    return {
        type: "ASSET_DATA"
    }
}

export const SaveData = () => {
    return {
        type: "SAVE_DATA",
    }
}

export const SaveDone = () => {
    return {
        type: "SAVE_DONE"
    }
}

export const EditData = () => {
    return {
        type: "EDIT_DATA"
    }
}

export const EditDone = () => {
    return {
        type: "EDIT_DONE"
    }
}

export const AuthAction = (type: string, data: any) => {
    return { type, data }
}