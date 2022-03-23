import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import postService from "../services/postService";

const PublishNewPost = (props) => {
    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [friendsTags, setFriendsTags] = useState([]);

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const onTagsChange = (e) => {
        setTags(e.target.value);
    }
    const onFriendsTagsChange = (e) => {
        setFriendsTags(e.target.value);
    }
    const handleNewPostSubmit = (e) => {
        const form = e.currentTarget;
        // console.log(form)
        // console.log(form.checkValidity())
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        if (form.checkValidity() === true) {
            postService.publish(
                title,
                props.user.id,
                friendsTags,
                tags,
                { lat: props.location.latitude, lng: props.location.longitude }
            ).then(
                response => {
                    console.log(response.data);
                },
                error => {
                    console.log(error)
                }
            )

        }
    }

    return (
        <Modal show={props.inNewPost} onHide={props.handleCloseNewPost}>
            <Modal.Header>
                <Modal.Title>Create NEW POST</Modal.Title>
            </Modal.Header>
            {props.user ?
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleNewPostSubmit}>
                        <Form.Group muted>
                            <Form.Text>
                                user name: {props.user.username}
                                {props.location && <Form.Label>
                                    location: {props.location.latitude} / {props.location.longitude}
                                </Form.Label>}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postTitle">
                            <Form.Label>Title your post:</Form.Label>
                            <Form.Control value={title} onChange={onTitleChange} required type="text" placeholder="Enter title" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postText">
                            <Form.Label>Tag Friends:</Form.Label>
                            <Form.Control value={friendsTags} onChange={onFriendsTagsChange} type="text" placeholder="@username" />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload image:</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                        <Form.Group controlId="postTags" className="mb-3">
                            <Form.Label>Create tags for your post:</Form.Label>
                            <Form.Control value={tags} onChange={onTagsChange} type="text" placeholder="Enter Tags" />
                        </Form.Group>
                        <Button variant="primary" type="submit">publish!</Button>
                    </Form>
                </Modal.Body>
                :
                <Modal.Body className="modal-body text-danger">You need to be loged-in to publish a post</Modal.Body>
            }
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleCloseNewPost}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default PublishNewPost;