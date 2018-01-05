import axios from "axios";

const instance = axios.create({
    baseURL: "https://monster-builder.firebaseio.com/"
});

export default instance;