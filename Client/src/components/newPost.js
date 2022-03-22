import { Button, Modal, Form } from "react-bootstrap";
import postService from "../services/postService";
const PublishNewPost = (props) => {

    const handleNewPost = (post) => {
        postService.publish(post);
    }
    return (
        <Modal show={props.inNewPost} onHide={props.handleCloseNewPost}>
            <Modal.Header>
                <Modal.Title>Create NEW POST</Modal.Title>
            </Modal.Header>
            {props.user ?
                <Modal.Body>
                    <Form>
                        <Form.Group muted>
                            <Form.Text>
                                user name: {props.user.username}
                                {props.location && <Form.Label>
                                    location: {props.location.latitude} - {props.location.longitude}
                                </Form.Label>}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postTitle">
                            <Form.Label>Title your post:</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postText">
                            <Form.Label>Text:</Form.Label>
                            <Form.Control type="text" placeholder="Enter text" />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload image:</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                        <Form.Group controlId="postTags" className="mb-3">
                            <Form.Label>Create tags for your post:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Tags"/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                :
                <Modal.Body className="modal-body text-danger">You need to be loged-in to publish a post</Modal.Body>
            }
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleCloseNewPost}>
                    Close
                </Button>
                {props.user && <Button variant="primary" >
                    Publish Post
                </Button>
                }

            </Modal.Footer>
        </Modal>
    )
}
export default PublishNewPost;