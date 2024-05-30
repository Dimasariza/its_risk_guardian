export const MenuItem = (menu: string) => {
    return {
        type: "MENU_ITEM",
        menu
    }
}

export const RerenderMenu = () => {
    console.log("rerender menu")
    return {
        type: "RERENDER_MENU"
    }
}