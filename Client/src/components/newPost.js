const PublishNewPost = (props) => {


    return (    
        <div className="card" style={{position:'fixed', zIndex:1, width: 18 + 'rem'}}>
            {/* <img src="..." class="card-img-top" alt="..."> */}
                <div className="card-body">
                    <h5 className="card-title">New Post</h5>
                    <p className="card-text">Text for new Post.</p>
                    {console.log(props.location)}
                    {props.location? 
                    <div className="card-text">{props.location.latitude} - {props.location.longitude}</div>: 
                    <div className="card-text">{props.text}</div>}
                    {/* <p className={props.location?"card-text":"alert"}>
                        {props.location.latitude} - {props.location.longitude}</p> */}
                    <a href="#" className="btn btn-primary">Publish</a>
                </div>
        </div>
    )   
}
export default PublishNewPost;