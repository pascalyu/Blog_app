import { USER_LOGIN_SUCCESS, USER_PROFILE_RECEIVED, USER_SET_ID, USER_PROFILE_ERROR, USER_LOGOUT } from "../actions/constants";

export default (state = {
    token: null,
    userId: null,
    isAuthenticated: false,
    isFetching: false,
    userData: null,
}, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                isFetching: false,
                isAuthenticated: true,
            }
            break;
        case USER_PROFILE_RECEIVED:
            console.log("received");
            return {
                ...state,
                userData:
                    state.userId === action.userId && state.userData === null ?
                        action.userData : state.userData,

                isAuthenticated: state.userId === action.userId && state.userData === null
            }
            break;
        case USER_SET_ID:
            console.log("user_set_id");
            return {
                ...state,
                userId: action.userId,
                isAuthenticated: true,
            }
            break;
        case USER_PROFILE_ERROR:

            return {
                ...state,
                isAuthenticated: false,
            }
            break;
        case USER_LOGOUT:

            return {
                ...state,
                isAuthenticated: false,
                token: null,
                userId: null,
                userData: null,
            }
            break;


        default: return state;
            break;
    }

}