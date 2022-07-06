import axios from "axios"
export const server = `http://${window.location.hostname}:4000`
axios.defaults.withCredentials = true;
// export const withCredentialsAxios = Object.assign({}, axios);

