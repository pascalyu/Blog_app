import { COMMENT_LIST_REQUEST, COMMENT_LIST_RECEIVED, COMMENT_LIST_ERROR, COMMENT_LIST_ADD, COMMENT_LIST_UNLOAD, COMMENT_ADDED } from "../actions/constants";
import { hydraPageCount } from "../apiUtils";

export default (state = {
    comments: null,
    isFetching: false,
    currentPage: 1,
    pageCount: null
}, action) => {
    switch (action.type) {
        case COMMENT_LIST_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
            break;
        case COMMENT_LIST_RECEIVED:
            return {
                ...state,
                comments: !state.comments ? action.data['hydra:member'] : state.comments.concat(action.data['hydra:member']),
                isFetching: false,
                currentPage: state.currentPage + 1,
                pageCount: hydraPageCount(action.data)
            }
        case COMMENT_ADDED:
            return {
                ...state,
                comments: [action.comment, ...state.comments]
            }




        case COMMENT_LIST_ADD:
            return {
                ...state,
                comments: state.comments ? state.comments.concat(action.data) : action.data,
                isFetching: false,
            }

        case COMMENT_LIST_ERROR:
        case COMMENT_LIST_UNLOAD:
            return {
                ...state,
                isFetching: false,
                comments: null,
                currentPage: 1,
                pageCount: null
            }


        default: return state;
            break;
    }

}