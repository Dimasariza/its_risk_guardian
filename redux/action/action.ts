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