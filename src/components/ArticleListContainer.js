import React from "react";
import ArticleList from "./ArticleList";
import { articleListFetch, articleListSetPage } from "../actions/action";
import { connect } from "react-redux";
import Spinner from "./Spinner";
import Messager from "./Messager";
import { Paginator } from "./Paginator";

const mapStateToProps = state => ({

    ...state.articleList
});

const mapDispatchToProps = {
    articleListFetch,
    articleListSetPage
};
class ArticleListContainer extends React.Component {
    componentDidMount() {


        this.props.articleListFetch(this.getQueryParamPage());

    }
    componentDidUpdate(prevProps) {

        const { currentPage, articleListFetch, articleListSetPage } = this.props;
        if (prevProps.match.params.page !== this.getQueryParamPage()) {
            articleListSetPage(this.getQueryParamPage());
        }
        if (prevProps.currentPage !== currentPage) {
            articleListFetch(currentPage);
        }
    }
    getQueryParamPage() {
        return Number(this.props.match.params.page) || 1

    }
    changePage(page) {
        const { history, articleListSetPage } = this.props;
        articleListSetPage(page);
        history.push(`/${page}`)
    }

    onNextPageClick(e) {
        const { currentPage, pageCount } = this.props;
        const newPage = Math.min(currentPage + 1, pageCount);
        this.changePage(newPage);
    }
    onPrevPageClick(e) {
        const { currentPage, pageCount } = this.props;
        const newPage = Math.max(currentPage - 1, 1);
        this.changePage(newPage);
    }
    render() {
        const { posts, isFetching, currentPage, pageCount } = this.props;
        console.log(pageCount);
        if (isFetching) {
            return (<div>
                <Spinner></Spinner>
            </div>
            )
        }
        if (posts == null || 0 === posts.length) {
            return (
                <Messager message="No Article"></Messager>
            )
        }
        return (
            <div>
                <ArticleList posts={posts} />
                <Paginator
                    setPage={this.changePage.bind(this)}
                    nextPage={this.onNextPageClick.bind(this)}
                    prevPage={this.onPrevPageClick.bind(this)}
                    pageCount={pageCount}
                    currentPage={currentPage}>

                </Paginator>
            </div>)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer);