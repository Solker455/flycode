const defaultToken = {
    token: undefined
};
const DELETE_INFO = 'DELETE_INFO';
export const logoutActionCreator_info = (data) => ({ type: DELETE_INFO, data })

export const tokenReducer = (state = defaultToken, action) => {
    switch (action.type) {
        case "ADD_TOKEN":
            return { ...state, token: action.token }
        case "DELETE_TOKEN":
            return { ...state, token: undefined }
        default:
            return state
    }
}