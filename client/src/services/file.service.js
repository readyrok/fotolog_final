import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/file/";

const upload = (formData) => {
    return axios.post(API_URL, formData, {
        headers: authHeader()
    });
};

const deleteFile = (id) => {
    return axios.delete(API_URL + "photo/" + id + "/", {headers: authHeader()})
}

const FileService = {
    upload,
    deleteFile
};

export default FileService;