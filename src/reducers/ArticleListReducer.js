import { ARTICLE_LIST_ERROR, ARTICLE_LIST_ADD, ARTICLE_LIST_REQUEST, ARTICLE_LIST_RECEIVE, ARTICLE_LIST_FETCH, ARTICLE_LIST_SET_PAGE } from "../actions/constants";
import { hydraPageCount } from "../apiUtils";

export default (state = {
    posts: null,
    isFetching: false,
    currentPage: 1,
    pageCount: null
}, action) => {
    switch (action.type) {
        case ARTICLE_LIST_REQUEST:
            state = {
                ...state,
                isFetching: true,
            };
            return state;
        case ARTICLE_LIST_RECEIVE:
            state = {
                ...state,
                posts: action.data['hydra:member'],
                isFetching: false,
                pageCount:hydraPageCount(action.data),
            }
            return state;
        case ARTICLE_LIST_ERROR:
            return {
                ...state,
                posts: null,
                isFetching: false,
            }


        case ARTICLE_LIST_ADD:
            state = {
                ...state,
                posts: state.posts ? state.posts.concat(action.data) : action.data,
                isFetching: false,
            }
            return state;
        case ARTICLE_LIST_SET_PAGE:

            return {
                ...state,
                currentPage: action.page
            };


        default: return state;

    }

}