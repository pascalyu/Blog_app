import superagentPromise from "superagent-promise";
import _superagent from 'superagent';
const superagent = superagentPromise(_superagent, global.Promise);
//const API_ROOT = "https://sheltered-meadow-85774.herokuapp.com/api";

//dev
const API_ROOT = "https://localhost:8000/api";


const responseBody = response => response.body;

let token = null;


const tokenPlugin = secured => {
    return (request) => {
        if (token && secured) {
            request.set('Authorization', `Bearer ${token}`);
        }
    }
}
export const requests = {
    get: (url, secured = false) => {
        console.log(`${API_ROOT}${url}`);
        return superagent.get(`${API_ROOT}${url}`).use(tokenPlugin(secured)).then(responseBody);
    },
    post: (url, body = null, secured = true) => {
        console.log(url);
        return superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin(secured)).then(responseBody);
    },

    upload: (url, file, secured = true) => {
        return superagent.post(`${API_ROOT}${url}`).attach('file', file)
            .use(tokenPlugin(secured)).then(responseBody)
    },
    delete: (url, secured = true) => {
        return superagent.del(`${API_ROOT}${url}`)
            .use(tokenPlugin(secured)).then(responseBody)
    },

    setToken: (newJwtToken) => token = newJwtToken

}