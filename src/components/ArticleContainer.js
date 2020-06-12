import React from "react";
import Article from "./Article";
import { articleFetch, articleUnload,articleListSetPage } from "../actions/action"
import { connect } from "react-redux";
import Spinner from "./Spinner";
import Messager from "./Messager";
import CommentListContainer from "./CommentListContainer";

const mapStateToProps = state => ({
    ...state.article
});

const mapDispatchToProps = {
    articleFetch,
    articleUnload,
    articleListSetPage
};
class ArticleContainer extends React.Component {

    componentDidMount() {

        this.props.articleFetch(this.props.match.params.id);

    }
    componentWillUnmount() {

        this.props.articleUnload();
    }
    render() {
        const { post, isFetching } = this.props;

        if (isFetching) {
            return (
                <div>
                    <Spinner></Spinner>
                </div>
            )

        }

        if (null === post) {
            return (
                <Messager message='error'></Messager>
            )
        }

        return (
            <div>
                <Article post={post} />
                {post && <CommentListContainer articleId={this.props.match.params.id} />}
            </div>
        )
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer);