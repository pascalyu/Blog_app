import React, { Component } from 'react';
import timeago from "timeago.js"
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

class ArticleList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { posts } = this.props;
        return (
            <ul>
                {posts && posts.map(post => (

                    <div className="card mb-3 p-3 shadow-sm" key={post.id}>
                        <h3><Link to={`/articles/${post.id}`}>{post.title}</Link></h3>
                        <p className="card-text border-top">
                            <small className="text-muted">
                                {timeago().format(post.createdAt)}
                            </small>

                        </p>
                    </div>

                ))}
                
            </ul>

        )
    }

}
export default ArticleList;