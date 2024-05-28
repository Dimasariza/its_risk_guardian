const Reducer = (state: any = {menu: ""}, {type, menu}: any) => {
    switch(type){
        case "MENU_ITEM":
            return {
                ...state,
                menu,
            }
        default:
            return state;
    }
}

export default Reducer;