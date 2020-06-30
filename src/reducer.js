import { combineReducers } from "redux";
import articleList from "./reducers/ArticleListReducer";
import article from "./reducers/ArticleReducer";
import commentList from "./reducers/CommentListReducer";
import registration from "./reducers/RegistrationReducer";
import auth from "./reducers/AuthReducer";
import articleForm from "./reducers/ArticleFormReducer";
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from "react-router-redux";

export default combineReducers({

    articleList,
    article,
    commentList,
    auth,
    registration,
    articleForm,
    router: routerReducer,
    form: formReducer
})