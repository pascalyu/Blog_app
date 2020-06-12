import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, reset } from "redux-form";
import { renderField } from "../form";
import { userRegister } from "../actions/action"

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    userRegister

}

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { termsAccepted: false }

    }
    onSubmit(values) {
        return this.props.userRegister(values).then(() => {
            reset();
        });

    }

    onTermsAcceptedClick(e) {
        this.setState(prevState => ({ termsAccepted: !prevState.termsAccepted }))
    }
    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <div className="card mt-3 mb-6 shadow-sm">
                <div className="card-body">
                    <form className="mt-4" onSubmit={handleSubmit(this.onSubmit.bind(this))}  >
                        <Field name="username" label="username" type="input" component={renderField} />
                        <Field name="name" label="name" type="input" component={renderField} />
                        <Field name="email" label="email" type="input" component={renderField} />
                        <Field name="password" label="password" type="password" component={renderField} />
                        <Field name="retypedPassword" label="Confirm password" type="password" component={renderField} />
                        <div className="form-check form-group">

                            <input onChange={this.onTermsAcceptedClick.bind(this)} className="form-check-input" id="term-checkbox" type="checkbox" value={false} />
                            <label className="form-check-label" htmlFor="term-checkbox">i agree to the terms and conditions</label>
                        </div>

                        <button disabled={submitting || !this.state.termsAccepted} className="form-control btn btn-primary" type="submit"  >Register</button>

                    </form>
                </div>

            </div >

        )
    }

}

export default reduxForm(
    {
        form: "RegisterForm"
    })(connect(null, mapDispatchToProps)(RegisterForm));