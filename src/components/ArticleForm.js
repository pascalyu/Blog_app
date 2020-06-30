import React from "react";
import { Field, reduxForm, reset } from "redux-form";
import { renderField } from "../form"
import { connect } from "react-redux";
import {imageDelete, articleCreate, articleFormUnload } from "../actions/action";
import { canWritePost } from '../apiUtils';
import { Redirect } from "react-router";
import ImageUpload from "./ImageUpload";
import ImageBrowser from "./ImageBrowser";


const mapDispatchToProps = {
    articleCreate,
    articleFormUnload,
    imageDelete
}
const mapStateToProps = state => ({
    ...state.articleForm,
    userData: state.auth.userData

})
class ArticleForm extends React.Component {


    /*componentDidUpdate() {
        if (this.props.articleCreated === true) {

            this.props.history.push("/");
        }
    }*/
    componentWillUnmount() {

        this.props.articleFormUnload();
    }
    onSubmit(values) {
        const { articleCreate, images } = this.props;
        return articleCreate(values, images).then(() => {
            reset();
            this.props.history.push("/");
        }

        );
    }
    render() {

        const { submitting, handleSubmit, userData, images, isImageUploading,imageDelete } = this.props;

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
                        <ImageUpload></ImageUpload>
                        <ImageBrowser images={images} deleteHandler={imageDelete}></ImageBrowser>
                        <button className="form-control btn btn-primary" type="submit" disabled={submitting || isImageUploading}  >Create</button>

                    </form>
                </div>
            </div>
        )

    }

}


export default reduxForm({ form: "ArticleForm" })(connect(mapStateToProps, mapDispatchToProps)(ArticleForm));