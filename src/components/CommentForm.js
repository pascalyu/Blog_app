import React from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import { renderField } from "../form";
import { commentAdd } from "../actions/action"

const mapDispatchToProps = {
    commentAdd

}

class CommentForm extends React.Component {

    onSubmit(values) {
        const { commentAdd, articleId, reset } = this.props;
        
        return commentAdd(values.content, articleId).then(() => reset());
    }
    render() {
        const { handleSubmit, submitting } = this.props;
        return (

            <div className="card mb-3 p-3 shadow-sm">
                <div className="card-body">

                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field label="type tour comment" name="content" type="input" component={renderField} />
                        <button disabled={submitting} className="btn btn-success form-control" type="submit">Add the comment</button>
                    </form>
                </div>
            </div>
        )
    }

}

export default reduxForm({

    form: "CommentForm"
})(connect(null, mapDispatchToProps)(CommentForm));