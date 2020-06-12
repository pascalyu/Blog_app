import React from "react";
import CommentList from "./CommentList";
import { commentListFetch, commentListUnload } from "../actions/action";
import { connect } from "react-redux";
import Spinner from "./Spinner";
import Messager from "./Messager";
import CommentForm from "./CommentForm";
import LoadMore from "./LoadMore";


const mapStateToProps = state => ({

    ...state.commentList,
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = ({
    commentListFetch,
    commentListUnload
});
class CommentListContainer extends React.Component {

    componentDidMount() {
        const { articleId } = this.props;
        console.log(articleId);
        this.props.commentListFetch(this.props.articleId);


    }
    componentWillUnmount() {
        this.props.commentListUnload();
    }

    onLoadMoreClick() {
        const { articleId, currentPage, commentListFetch } = this.props;
        commentListFetch(articleId, currentPage);

    }

    render() {
        const { comments, isFetching, isAuthenticated, articleId, currentPage, pageCount } = this.props;
        const showLoadMore = pageCount > 1 && currentPage <= pageCount;
        if (isFetching && currentPage === 1) {
            return (<div>
                <Spinner></Spinner>
            </div>
            )
        }
        if (comments === null) {
            return (
                <Messager message="No comments yet"></Messager>
            )
        }
        return (
            <div>
                <CommentList comments={comments}></CommentList>
                {showLoadMore && <LoadMore label="Load more comments..." disabled={isFetching} loadMore={this.onLoadMoreClick.bind(this)}></LoadMore>}
                {isAuthenticated && <CommentForm articleId={articleId} />}
            </div >
        )

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);