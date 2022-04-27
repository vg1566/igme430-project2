// This file handles the main page with react
const helper = require('./helper.js');

// return "html" of post maker form
const AccountInfo = (props) => {
    return (
        <div id="accountInfo">
            <h1>{props.username}'s Profile</h1>
        </div>
    );
}

// return "html" of post maker form
const PostForm = (props) => {
    return (
        <form id="postForm"
            name="postForm"
            onSubmit={handlePost}
            action="/makePost"
            method="POST"
            className="input-group vertical"
        >
            <label htmlFor="mainBody">Make a Post! </label>
            <textarea id="mainBody" name="mainBody" placeholder="Type something here..." />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input type="submit" value="Post" />
        </form>
    );
}
// construct and send post
const handlePost = (e) => {
    e.preventDefault();
    helper.hideError();

    const mainBody = e.target.querySelector('#mainBody').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    // check if data is good
    if(!mainBody) {
        helper.handleError('Brevity is the soul of wit, but you must enter <i>something</i>.');
        return false;
    }

    // post to server and reload post list
    helper.sendPost(e.target.action, {mainBody, _csrf}, loadPostsFromServer);

    return false;
}

const SetPremium = async (e, newPremiumValue) => {
    e.preventDefault();
    helper.hideError();

    const _csrf = e.target.querySelector('#_csrf').value;
    helper.sendPost(e.target.action, {premium: newPremiumValue, _csrf: _csrf}, LoadAds);

    return false;
}

const PremiumButton = (props) => {
    if(props.premium === "true") return (
        <form id="premiumForm"
            name="premiumForm"
            onSubmit={(e) => SetPremium(e, "false")}
            action="/setPremium"
            method="POST"
            className="premiumForm"
        >
            <h3>You have premium!</h3>
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="premiumButton" type="submit" value="Remove Premium" />
        </form>
    );
    return (
        <form id="premiumForm"
            name="premiumForm"
            onSubmit={(e) => SetPremium(e, "true")}
            action="/setPremium"
            method="POST"
            className="premiumForm"
        >
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="premiumButton" type="submit" value="Buy Premium" />
        </form>
    );
}

// list all posts passed in props
const PostList = (props) => {
    if(props.posts.length === 0) {
        return (
            <div className="PostList">
                <h3>You haven't posted anything yet!</h3>
            </div>
        );
    }

    const postNodes = props.posts.reverse().map(post => {
        return (
            <div key={post._id} className="post card">
                <h3> {post.username}: </h3>
                <p> {post.mainBody} </p>
            </div>
        );
    });

    return (
        <div className="postList">
            {postNodes}
        </div>
    );
}

// get current user's posts and send to PostList
const loadUserPostsFromServer = async () => {
    const response = await fetch('/getPosts'); // /getUserPosts
    const data = await response.json();
    ReactDOM.render(
        <PostList posts={data.posts} />,
        document.getElementById('accountPosts')
    );
}

const init = async () => {
    // get token
    const response = await fetch('/getToken');
    const data = await response.json();
    const response2 = await fetch('/getPremium');
    const premiumData = await response2.json();
    const response3 = await fetch('/getUserInfo');
    const userData = await response3.json();

    // hook up event listeners (windows to buttons)
    ReactDOM.render(
        <AccountInfo username={userData.username} csrf={data.csrfToken} />,
        document.getElementById('accountInfo')
    );

    ReactDOM.render(
        <PostForm csrf={data.csrfToken} />,
        document.getElementById('accountOptions')
    );

    // render premium mode button
    ReactDOM.render(
        <PremiumButton premium={premiumData.premium} csrf={data.csrfToken} />,
        document.getElementById('premium')
    );

    // load stuff
    loadUserPostsFromServer();
}

window.onload = init;