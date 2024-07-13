export const Reducer = (state: any = { menu: '' }, { type, menu }: any) => {
  switch (type) {
    case 'MENU_ITEM':
      return {
        ...state,
        menu
      };
    default:
      return state;
  }
};

export const RerenderMenu = (state: any = { rerender: false }, { type }: any) => {
  switch (type) {
    case 'RERENDER_MENU':
      return {
        ...state,
        rerender: true
      };
    default:
      return state;
  }
};

export const AssetData = (state: any, type: string) => {
  switch (type) {
    case 'ASSET_DATA':
      return {
        ...state
      };
    default:
      return state;
  }
};

export const EditReducer = (state: any = { edit: false, undoEdit: false}, { type, undoEdit = false }: any) => {
  switch (type) {
    case 'EDIT_DATA':
      return {
        ...state,
        edit: true,
      };
      case 'EDIT_DONE':
        return {
        ...state,
        edit: false,
        undoEdit
      };
    default:
      return {...state};
  }
};

export const AuthReducer = (state: any = { login: false }, { type, data }: any) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        data
      };
    case 'LOGOUT':
      return {
        ...state,
        data
      };
    default:
      return state;
  }
};
