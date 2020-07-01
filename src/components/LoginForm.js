import React from "react";
import { reduxForm, Field } from "redux-form";
import { renderField } from "../form";
import { userLoginAttempt } from "../actions/action"
import { connect } from "react-redux";

const mapStateToProps = state => ({
    ...state.auth
})

const mapDispatchToProps = {
    userLoginAttempt

}

class LoginForm extends React.Component {
    componentDidUpdate(prevProps) {
        if (prevProps.token !== this.props.token) {
            this.props.history.push('/');
        }

    }
    onSubmit(values) {
        return this.props.userLoginAttempt(
            values.username,
            values.password
        )
    }
    render() {
        const { handleSubmit, error } = this.props;
      
        return (

            <div className="text-center">
                {error &&
                    <div className="alert alert-danger">
                        {error}
                    </div>
                }
                <div className="card-body"> vous pouvez vous connecter avez testtest/testTest9</div>
                <form className="mt-4" onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                    <Field name="username" label="username" type="input" component={renderField} />
                    <Field name="password" label="password" type="password" component={renderField} />
                    <button className="form-control btn btn-primary" type="submit"  >Login</button>

                </form>

            </div>)
    }

}
export default reduxForm(
    {
        form: "LoginForm"
    })
    (connect(mapStateToProps, mapDispatchToProps)
        (LoginForm));