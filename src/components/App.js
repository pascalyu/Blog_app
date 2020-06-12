import React from "react";
import LoginForm from "./LoginForm";
import { Route, Switch } from "react-router";

import ArticleListContainer from "./ArticleListContainer";
import Header from "./Header";
import ArticleContainer from "./ArticleContainer";
import { userFetch, userSetId, userLogout } from "../actions/action";
import { requests } from "../agent";
import { connect } from "react-redux";
import RegistrationContainer from "./RegistrationContainer";
import ArticleForm from "./ArticleForm";

const mapStateToProps = state => ({
    ...state.auth,

})

const mapDispatchToProps = {

    userFetch,
    userSetId,
    userLogout,
}

class App extends React.Component {

    componentDidMount() {
        const userId = window.localStorage.getItem('userId');
        const { userSetId } = this.props;
        if (userId) {
            userSetId(userId);
        }

    }

    componentDidUpdate(prevProps) {
        const { userId, userData, userFetch } = this.props;
        if (prevProps.userId !== userId && userId !== null && userData === null) {
            console.log("old " + prevProps.userId);
            console.log(userId);
            userFetch(userId);
        }

    }
    constructor(props) {
        super(props);
        const token = window.localStorage.getItem('jwtToken');
        if (token) {
            requests.setToken(token)
        }
    }
    render() {
        const { isAuthenticated, userData, userLogout } = this.props;

        return (

            <div>
                <Header userData={userData} isAuthenticated={isAuthenticated} logout={userLogout} />
                <div>
                    <Switch>
                        <Route path="/articles/:id" component={ArticleContainer} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/register" component={RegistrationContainer} />
                        <Route path="/article/create" component={ArticleForm} />
                        <Route path="/:page?" component={ArticleListContainer} />

                    </Switch>
                </div>
            </div>
        )
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(App);