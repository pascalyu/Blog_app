import React from "react";
import { Field, reduxForm,reset } from "redux-form";
import { renderField } from "../form"
import { connect } from "react-redux";
import { articleCreate } from "../actions/action";
import { canWritePost } from '../apiUtils';
import { Redirect } from "react-router";

const mapStateToProps = state => ({
    ...state.article,
    userData: state.auth.userData

})
const mapDispatchToProps = {
    articleCreate
}
class ArticleForm extends React.Component {


    /*componentDidUpdate() {
        if (this.props.articleCreated === true) {

            this.props.history.push("/");
        }
    }
    componentWillUnmount() {

        this.setState(({ articleCreated: false }));
    }*/
    onSubmit(values) {
        const { articleCreate } = this.props;
        return articleCreate(values).then(() => {
            reset();
            this.props.history.push("/");
        }

        );
    }
    render() {

        const { handleSubmit, userData } = this.props;
        console.log(userData);
        if (!canWritePost(userData)) {

            return <Redirect to="/login"></Redirect>

        }
        return (
            <div className="card mt-3 mb-6 shadow-sm">
                <div className="card-body">
                    <form className="mt-4" onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                        <Field name="title" label="Title" type="input" component={renderField} />
                        <Field name="content" label="Content" type="textarea" component={renderField} />
                        <Field name="shown" label="show it" type="checkbox" className="form-group" component={renderField} />

                        <button className="form-control btn btn-primary" type="submit"  >Create</button>

                    </form>
                </div>
            </div>
        )

    }

}


export default reduxForm({ form: "ArticleForm" })(connect(mapStateToProps, mapDispatchToProps)(ArticleForm));