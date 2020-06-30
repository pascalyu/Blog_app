import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class ImageBrowser extends React.Component {
    render() {
        const { images, deleteHandler } = this.props;


        return (
            <div className="row mt-4 mb-4">

                <TransitionGroup  >
                    {images.map(image => {
                        const onImageDeleteClick = (event) => {
                            event.preventDefault()
                            deleteHandler(image.id);
                        }
                        return (
                            <CSSTransition timeout={10000} classNames="fade" key={image.id} >
                                <div className="col-md-6 col-lg-4">
                                    <div className="mt-2 mb-2">
                                        <img src={`http://localhost:8000/images/articles/${image.url}`} className="img-fluid"></img>
                                    </div>
                                    <div className="mb-2">
                                        <button type="button" onClick={onImageDeleteClick} className="btn btn-outline-danger btn-sm">remove</button>
                                    </div>
                                </div>
                            </CSSTransition>
                        )
                    })
                    }
                </TransitionGroup>
            </div>
        );
    }
}

export default ImageBrowser;