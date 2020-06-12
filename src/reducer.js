import { combineReducers } from "redux";
import articleList from "./reducers/ArticleListReducer"
import article from "./reducers/ArticleReducer"
import commentList from "./reducers/CommentListReducer"
import registration from "./reducers/RegistrationReducer"
import auth from "./reducers/AuthReducer"
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from "react-router-redux";

export default combineReducers({

    articleList,
    article,
    commentList,
    auth,
    registration,
    router: routerReducer,
    form: formReducer
})