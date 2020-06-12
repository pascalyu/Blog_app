import React from "react";
import timeago from "timeago.js";

class CommentList extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        const { comments } = this.props;
        return (

            <div className="card shadow-sm p-3">
                <h5>{comments.length} Commentaires</h5>
                {comments && comments.map(comment => (

                    <div className="mb-3  pt-3 card-text border-top" key={comment.id}>
                        <p>{comment.content}</p>
                        <small className="text-muted">{timeago().format(comment.createdAt)}</small>
                        <small className="text-muted"> by  {comment.author.username}</small>
                    </div>


                ))}
            </div>
        )
    }

}
export default CommentList;