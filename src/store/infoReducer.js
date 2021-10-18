const defaultInfo = {
    token: undefined
};
const DELETE_TOKEN = 'DELETE_TOKEN';
export const logoutActionCreator_token = (data) => ({ type: DELETE_TOKEN, data })

export const infoReducer = (state = defaultInfo, action) => {
    switch (action.type) {
        case "ADD_INFO":
            return { ...state, userInfo: action.userInfo }
        case "DELETE_INFO":
            return { ...state, userInfo: undefined }
        default:
            return state
    }
}