import React from "react";
import RegisterForm from "./RegisterForm";
import ConfirmationForm from "./ConfirmationForm";
import { userRegisterCompleted } from "../actions/action";
import { connect } from "react-redux";


const mapStateToProps = state => ({
    ...state.registration,
});

const mapDispatchToProps = {
    userRegisterCompleted,
}
class RegistrationContainer extends React.Component {
    constructor(props) {

        super(props);
        this.state = { counter: 10 };
    }

    componentDidUpdate(prevProps, prevState) {
        const { confirmationSuccess, history, userRegisterCompleted } = this.props;
        console.log(this.state.counter);
        if (prevProps.confirmationSuccess !== confirmationSuccess && confirmationSuccess) {
            this.timer = setInterval(
                () => {
                    this.setState(prevState => ({ counter: prevState.counter - 1 }))
                }, 1000)

        }
        if (prevState.counter !== this.state.counter && this.state.counter <= 0) {
            userRegisterCompleted();
            history.push('/');
        }


    }
    componentWillUnmount() {
        this.props.userRegisterCompleted();
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    render() {
        const { registrationSuccess, confirmationSuccess } = this.props;
        if (!registrationSuccess) {
            return (
                <RegisterForm></RegisterForm>
            )
        }
        if (!confirmationSuccess) {
            return (
                <ConfirmationForm></ConfirmationForm>
            )
        }

        return (

            <div class="mt-3">
                <div className="card-body">
                    Congratulation ! your account is confirmed <span>you will be redirect in Home in {this.state.counter} </span>
                </div>
            </div>
        )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);