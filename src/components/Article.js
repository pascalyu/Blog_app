import React from "react";
import timeago from "timeago.js"
import Spinner from "./Spinner";

class Article extends React.Component {

    render() {
        const { id, post } = this.props;


        return (

            <div className="card p-3 mb-3 mt-3 shadow-sm">
                <h3>{post.title}</h3>
                <p>
                    <small>{timeago().format(post.createdAt)}</small>
                    <div>
                        <small>by {post.author.username}</small>
                    </div>
                </p>

                <div className="border-top p-3">  {post.content} </div>
            </div>

        )
    }

}
export default Article;