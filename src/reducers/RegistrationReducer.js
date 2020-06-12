import { USER_REGISTER_SUCCESS, USER_CONFIRMATION_SUCCESS, USER_REGISTER_COMPLETED } from "../actions/constants";

export default (state = {
    registrationSuccess: false,
    confirmationSuccess: false

}, action) => {
    switch (action.type) {
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                registrationSuccess: true,
            }

        case USER_CONFIRMATION_SUCCESS:
            return {
                ...state,
                confirmationSuccess: true,
            }
        case USER_REGISTER_COMPLETED:
            return {
                ...state,
                confirmationSuccess: false,
                registrationSuccess: false,

            }
        default: return state;

    }

}