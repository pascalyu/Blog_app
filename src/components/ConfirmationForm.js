import React from "react";
import { Field, reduxForm } from "redux-form"
import { connect } from "react-redux";
import { renderField } from "../form";
import { userConfirm } from "../actions/action";


const mapStateToProps = state => ({
    ...state.registration
})
const mapDispatchToProps = {
    userConfirm

}

class ConfirmationForm extends React.Component {
    onSubmit(value) {

        const { userConfirm } = this.props;
        userConfirm(value);

    }
    render() {
        const { handleSubmit } = this.props;

        return (

            <div className="text-center">

                <form className="mt-4" onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                    <Field name="confirmationToken" label="Token Confirmation ( we sent you a mail)" type="input" component={renderField} />
                    <button className="form-control btn btn-primary" type="submit"  >Confirm</button>
                </form>

            </div>)
    }

}
export default reduxForm(
    {
        form: "ConfirmationForm"
    })
    (connect(mapStateToProps, mapDispatchToProps)
        (ConfirmationForm));