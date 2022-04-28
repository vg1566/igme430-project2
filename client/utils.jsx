// contains PostList, a component used in main and profile

const helper = require('./helper.js');

const PostList = (props, loadPostCallback) => {
    if(props.posts.length === 0) {
      return (
        <div className="PostList">
          <h3>Looks awfully empty here... Why not post something?</h3>
        </div>
      );
    }
    
    const postNodes = props.posts.reverse().map(post => {
        // if it's your post, add a 'delete' button to delete post
      if(post.poster === props._id) {  return(
        <div key={post._id} className="post card fluid">
          <div className="section dark row">
            <h4 className="col-sm"> {post.username}: </h4>
            <form
                name="deleteForm"
                action="/deletePost"
                onSubmit={(e) => { 
                    e.preventDefault();
                    helper.hideError();
                    helper.sendPost(e.target.action, { 
                        postId: post._id,
                        _csrf: props.csrf
                    }, loadPostCallback);
                }}
                method="POST"
                className="deleteForm col-sm"
            >
                <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
                <input className="deleteButton" type="submit" value="Delete Post" />
            </form>
          </div>
          <div className="section">
            <p> {post.mainBody} </p>
          </div>
          
        </div>
      )} else { return ( // if it's not your post, no delete button
          <div key={post._id} className="post card fluid">
              <div className="section dark">
                  <h4> {post.username}: </h4>
              </div>
              <div className="section">
                  <p> {post.mainBody} </p>
              </div>
          </div>
      )};
    });
    
    return (
        <div className="postList col-sm">
            {postNodes}
        </div>
    );
  }

module.exports = {
    PostList,
}