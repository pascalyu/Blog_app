import { IMAGE_UPLOAD_REQUEST, IMAGE_UPLOADED, IMAGE_UPLOAD_ERROR, ARTICLE_FORM_UNLOAD, IMAGE_DELETED } from "../actions/constants";

export default (state = {
    isImageUploading: false,
    image: null,
    images: []

}, action) => {
    switch (action.type) {
        case IMAGE_UPLOAD_REQUEST:
            return {
                ...state,
                isImageUploading: true
            }

        case IMAGE_UPLOADED:
            return {
                ...state,
                isImageUploading: false,

                image: action.image,
                images: state.images.concat(action.image)
            }
        case IMAGE_UPLOAD_ERROR:
            return {
                ...state,
                isImageUploading: false
            }
        case ARTICLE_FORM_UNLOAD:
            return {
                ...state,
                image: null,
                images: [],
                isImageUploading: false
            }
        case IMAGE_DELETED:
            return {
                ...state,
                images: state.images.filter(image => image.id !== action.imageId),
            }
        default:
            return state;

    }

}