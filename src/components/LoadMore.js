import React from "react";

class LoadMore extends React.Component {


    render() {
        const { label, disabled, loadMore } = this.props;
        return (
            <div className="mb-3 mt-3">
                <button className="form-control btn btn-outline-primary" disabled={disabled} onClick={loadMore}>
                    {label}
                </button>
            </div>
        )

    }

}

export default LoadMore;