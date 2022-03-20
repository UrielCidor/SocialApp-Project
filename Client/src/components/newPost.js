const PublishNewPost = (props) => {


    return (    
        <div className="card" style={{position:'fixed', zIndex:1, width: 18 + 'rem'}}>
            {/* <img src="..." class="card-img-top" alt="..."> */}
                <div className="card-body">
                    <h5 className="card-title">New Post</h5>
                    <p className="card-text">Text for new Post.</p>
                    <a href="#" className="btn btn-primary">Publish</a>
                </div>
        </div>
    )   
}
export default PublishNewPost;