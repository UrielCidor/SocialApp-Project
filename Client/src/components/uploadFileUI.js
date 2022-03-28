import { Component } from "react";
import UploadService from "../services/file-uploadService";
import './uploadFileUI.css'

export default class UploadImages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentFile: undefined,
            previewImage: undefined,
            progress: 0,
            message: "",
            user: props.user,
        };
    }

    selectFile(e) {
        console.log(e.target.files[0]);
        this.setState({
            currentFile: e.target.files[0],
            previewImage: URL.createObjectURL(e.target.files[0]),
            progress: 0,
            message: ""
        });
    }

    upload(e) {
        e.preventDefault();
        this.setState({
            progress: 0
        });
        UploadService.upload(this.state.currentFile, this.state.user.id, (e) => {
            console.log(e)
            this.setState({
                progress: Math.round((100 * e.loaded) / e.total)
            });
        })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    message: response.data.message
                });
                this.props.onImageChange(response.data.imageUrl);
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    progress: 0,
                    message: "Could not upload the image!",
                    currentFile: undefined
                });
            })
    }

    render() {
        const {
            currentFile,
            previewImage,
            progress,
            message,
        } = this.state;
        return (
            <div className="content">
                <div className="row">
                    <div className="col-8">
                        <label className="btn btn-default p-0">
                            <input type="file" accept="image/*" onChange={this.selectFile.bind(this)} />
                        </label>
                    </div>
                    <div className="col-4">
                        <button
                            className="btn btn-success btn-sm"
                            disabled={!currentFile}
                            onClick={this.upload.bind(this)}
                        >
                            Upload
                        </button>
                    </div>
                </div>
                {currentFile && (
                    <div className="progress my-3">
                        <div
                            className="progress-bar progress-bar-info progress-bar-striped"
                            role="progressbar"
                            aria-valuenow={progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: progress + "%" }}
                        >
                            {progress}%
                        </div>
                    </div>
                )}
                {previewImage && (
                    <div>
                        <img className="preview" src={previewImage} alt="" />
                    </div>
                )}
                {message && (
                    <div className="alert alert-secondary mt-3" role="alert">
                        {message}
                    </div>
                )}
            </div>
        );
    }
}