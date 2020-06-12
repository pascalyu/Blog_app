import React from "react";
import classNames from "classnames";
export class Paginator extends React.Component {
    constructor(props) {

        super(props);
        const { pageCount, currentPage } = this.props;
        this.range = [];

        for (let i = 1; i <= pageCount; i++) {
            this.range.push(i);

        }
    }
    render() {
        const { currentPage, setPage,prevPage,nextPage } = this.props;
        return (

            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <button onClick={prevPage} className="page-link">
                            Previous
                        </button>
                    </li>
                    {
                        this.range.map(page => {
                            const onClick = () => {
                                setPage(page);
                            };
                            return (

                                <li key={page} className={classNames('page-item', { active: currentPage === page })}>
                                    <button className="page-link" onClick={onClick}>{page}</button>
                                </li>
                            )
                        })

                    }
                    <li>
                        <button onClick={nextPage} className="page-link">
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        )
    }
}