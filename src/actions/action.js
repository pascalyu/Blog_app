import { requests } from "../agent";
import {
    COMMENT_ERROR,
    USER_PROFILE_REQUEST,
    USER_PROFILE_ERROR,
    USER_PROFILE_RECEIVED,
    ARTICLE_LIST_ADD,
    ARTICLE_LIST_ERROR,
    ARTICLE_LIST_RECEIVE,
    ARTICLE_LIST_REQUEST,
    ARTICLE_RECEIVED,
    ARTICLE_REQUEST, ARTICLE_ERROR,
    ARTICLE_ADD,
    ARTICLE_UNLOAD,
    COMMENT_LIST_RECEIVED,
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_ERROR,
    COMMENT_LIST_UNLOAD,
    COMMENT_LIST_ADD,
    USER_LOGIN_SUCCESS,
    USER_SET_ID,
    COMMENT_ADDED,
    USER_LOGOUT,
    ARTICLE_LIST_SET_PAGE,
    USER_REGISTER_SUCCESS,
    USER_CONFIRMATION_SUCCESS,
    USER_REGISTER_COMPLETED,
    ARTICLE_CREATED_SUCCESS
} from "./constants"
import { SubmissionError } from "redux-form";
import request from "superagent";
import { parseApiErrors } from "../apiUtils";
import { parse } from "marked";


/**Article List*/

export const articleListRequest = () => ({
    type: ARTICLE_LIST_REQUEST,
});
export const articleListReceive = (data) => ({
    type: ARTICLE_LIST_RECEIVE,
    data
});

export const articleListError = (error) => ({
    type: ARTICLE_LIST_ERROR,
    error
});
export const articleListSetPage = (page) => ({
    type: ARTICLE_LIST_SET_PAGE,
    page
});
export const articleListFetch = (page = 1) => {
    return (dispatch) => {
        dispatch(articleListRequest());
        return requests.get(`/articles?page=${page}`)
            .then(response => dispatch(articleListReceive(response)))
            .catch(error => dispatch(articleListError(error)));
    };
}
export const articleListAdd = () => ({
    type: ARTICLE_LIST_ADD,
    data: [
        {
            id: Math.floor(Math.random() * 100 + 3),
            title: "new "
        }
    ]
})
/**Article */

export const articleRequest = () => ({
    type: ARTICLE_REQUEST,
});
export const articleReceived = (data) => ({
    type: ARTICLE_RECEIVED,
    data
});

export const articleError = (error) => ({
    type: ARTICLE_ERROR,
    error
});
export const articleFetch = (id) => {
    return (dispatch) => {
        dispatch(articleRequest());
        return requests.get(`/articles/${id}`)
            .then(response => dispatch(articleReceived(response)))
            .catch(error => dispatch(articleError(error)));
    };
}

export const articleUnload = () => ({
    type: ARTICLE_UNLOAD,
})
export const articleAdd = () => ({
    type: ARTICLE_ADD,
    data: [
        {
            id: Math.floor(Math.random() * 100 + 3),
            title: "new "
        }
    ]
})

/**Comment list */

export const commentListRequest = () => ({
    type: COMMENT_LIST_REQUEST,
});
export const commentListReceived = (data) => ({
    type: COMMENT_LIST_RECEIVED,
    data
});

export const commentListError = (error) => ({
    type: COMMENT_LIST_ERROR,
    error
});
export const commentListFetch = (id, page = 1) => {
    return (dispatch) => {
        dispatch(commentListRequest());
        return requests.get(`/articles/${id}/comments?page=${page}`)
            .then(response => dispatch(commentListReceived(response)))
            .catch(error => dispatch(commentListError(error)));
    };
}

export const commentListUnload = () => ({
    type: COMMENT_LIST_UNLOAD,
})
export const commentListAdd = () => ({
    type: COMMENT_LIST_ADD,
    data: [
        {
            id: Math.floor(Math.random() * 100 + 3),
            title: "new "
        }
    ]
})


export const userLoginAttempt = (username, password) => {
    return (dispatch) => {

        return requests.post("/login_check", { username, password }, false).then(
            response => dispatch(userLoginSuccess(response.token, response.id))
        ).catch(error => {
            throw new SubmissionError({
                _error: 'bad login or password'
            })
        });
    };
}


export const userRegisterSuccess = () => {
    return {
        type: USER_REGISTER_SUCCESS
    }
};
export const userRegister = (values) => {

    return (dispatch) => {
        return requests.post("/users", values, false)
            .then(
                response => { dispatch(userRegisterSuccess()) }
            )
            .catch(error => {

                throw new SubmissionError(
                    parseApiErrors(error))
            });
    };
}
export const userConfirmationSuccess = () => {
    return {
        type: USER_CONFIRMATION_SUCCESS
    }
};


export const userRegisterCompleted = () => {
    return {
        type: USER_REGISTER_COMPLETED
    }
};
export const userConfirm = (confirmationToken) => {

    return (dispatch) => {
        return requests.post("/user_confirmations", confirmationToken, false)
            .then(
                response => { dispatch(userConfirmationSuccess()) }
            )
            .catch(error => {
                throw new SubmissionError({ _error: "token is invalid" })
            });
    };
}



export const userLoginSuccess = (token, userId) => ({
    type: USER_LOGIN_SUCCESS,
    token,
    userId
});

export const userProfileRequest = () => ({
    type: USER_PROFILE_REQUEST,

});
export const userProfileReceived = (userId, userData) => ({

    type: USER_PROFILE_RECEIVED,
    userId,
    userData

});

export const userProfileError = () => ({
    type: USER_PROFILE_ERROR,
});


export const userSetId = (userId) => ({
    type: USER_SET_ID,
    userId
});


export const userFetch = (userId) => {
    return (dispatch) => {
        dispatch(userProfileRequest());
        return requests.get(`/users/${userId}`, false)
            .then(response => dispatch(userProfileReceived(userId, response)))
            .catch(error => dispatch(userProfileError()));

    };
};

export const commentAdded = (comment) => ({
    type: COMMENT_ADDED,
    comment
});


export const commentError = () => ({
    type: COMMENT_ERROR
});

export const commentAdd = (comment, articleId) => {
    return (dispatch) => {

        return requests.post(`/comments`,
            {
                content: comment,
                article: `/api/articles/${articleId}`
            })
            .then(response => dispatch(commentAdded(response)))
            .catch(error => {
                if (401 === error.response.status) {

                    return dispatch(userLogout());
                }
                throw new SubmissionError(
                    parseApiErrors(error))
            });

    };
};

export const userLogout = () => {
    return {
        type: USER_LOGOUT
    }

};


export const articleCreated = (articleId) => {
    return {
        type: ARTICLE_CREATED_SUCCESS,
        articleId: articleId

    }
}

export const articleCreate = (values) => {
    return (dispatch) => {
        return requests.post(`/articles`,
            values)
            .then(response => dispatch(articleCreated(response.id)))
            .catch(error => {
                if (401 === error.response.status) {
                    return dispatch(userLogout());
                }
                throw new SubmissionError(parseApiErrors(error))

            });
    };
};
