import { ARTICLE_REQUEST, ARTICLE_RECEIVED, ARTICLE_ERROR, ARTICLE_ADD, ARTICLE_UNLOAD, ARTICLE_CREATED_SUCCESS } from "../actions/constants";

export default (state = {
    post: null,
    isFetching: false,
    articleCreated: false,
}, action) => {
    switch (action.type) {
        case ARTICLE_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
            break;
        case ARTICLE_RECEIVED:
            return {
                ...state,
                post: action.data,
                isFetching: false,
            }
            break;
        case ARTICLE_ERROR:
            return {
                ...state,
                post: null,
                isFetching: false,
            }
            break;

        case ARTICLE_ADD:
            return {
                ...state,
                post: state.post ? state.post.concat(action.data) : action.data,
                isFetching: false,
            }
            break;
        case ARTICLE_UNLOAD:
            return {
                ...state,
                isFetching: false,
                post: null
            }
            break;
        case ARTICLE_CREATED_SUCCESS:
            return {
                ...state,
                articleCreated: true,

            }
            break;

        default: return state;
            break;
    }

}