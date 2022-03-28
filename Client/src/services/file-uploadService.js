import axios from "axios";
const API_URL = "http://localhost:4000/api/images/";

class FileUploadService {
    upload(file, userId, onUploadProgress ) {
        let formData = new FormData();
        formData.append("file", file);
        console.log(formData);

        return axios.post(API_URL + `upload/${userId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }

    downloadImage(filename){
        return axios.get(API_URL + `files/${filename}`)
    }

}

export default new FileUploadService()
