// This file handles the main page with react
const helper = require('./helper.js');


// return "html" of post maker form
//const PostForm = (props) => {
//    
//}

// construct and send post
const handlePost = (e) => {
    e.preventDefault();
    helper.hideError();

    const mainBody = e.target.querySelector('#mainBody').value;
    //const age = e.target.querySelector('#domoAge').value;
    //const teeth = e.target.querySelector('#domoTeeth').value;
    //const _csrf = e.target.querySelector('#_csrf').value;

    // check if data is good
    if(!mainBody) {
        helper.handleError('Brevity is the soul of wit, but you must enter <i>something</i>.');
        return false;
    }

    // post to server and reload post list
    helper.sendPost(e.target.action, {mainBody, _csrf}, loadPostsFromServer);

    return false;
}

const PostList = (props) => {
    if(props.posts.length === 0) {
        return (
            <div className="PostList">
                <h3>Looks awfully empty here... Why not post something?</h3>
            </div>
        );
    }

    const postNodes = props.posts.map(post => {
        return (
            <div key={post._id} className="post">
                <h3> From: {post.username} </h3>
                <p> Age: {post.age} </p>
            </div>
        );
    });

    return (
        <div className="postList">
            {postNodes}
        </div>
    );
}

// get posts and send to PostList
const loadPostsFromServer = async () => {
    const response = await fetch('/getPosts');
    const data = await response.json();
    ReactDOM.render(
        <PostList posts={data.posts} />,
        document.getElementById('content')
    );
}

const init = async () => {
    // get token
    const response = await fetch('/getToken');
    const data = await response.json();
    // hook up event listeners (windows to buttons)
    ReactDOM.render(
        <PostList posts={[]} />,
        document.getElementById('content')
    );
    // render postmaker
    // render posts
    // render ads
}

window.onload = init;