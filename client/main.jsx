// This file handles the main page with react
const helper = require('./helper.js');
const utils = require('./utils.jsx');

// return "html" of post maker form
const PostForm = (props) => {
  return (
    <form id="postForm"
      name="postForm"
      onSubmit={handlePost}
      action="/makePost"
      method="POST"
      className="input-group vertical col-sm"
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
    e.target.querySelector('#mainBody').value = '';
    const _csrf = e.target.querySelector('#_csrf').value;

    // check if data is good
    if(!mainBody) {
        helper.handleError('Brevity is the soul of wit, but you cannot post an empty box.');
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

    // re-render premium stuff
    LoadAds();

    return false;
}

// return source of random ad image
const getRandomAd = () => {
    const adList = ['/assets/img/ad1.jpg', '/assets/img/ad2.jpg', '/assets/img/ad3.jpg'];
    const rand = Math.floor(Math.random() * adList.length);
    return `${adList[rand]}`;
}

// return ads if user doesn't have premium
const Ads = (props) => {
    if(props.premium === "false") return (
        <div id="ads" className="adBox col-sm">
            <img src={`${getRandomAd()}`} alt="ad" className="ad" />
        </div>
    );
    return (<div></div>);
};

// get data needed for ad rendering and render ads (and premium button)
const LoadAds = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();
    const response2 = await fetch('/getPremium');
    const premiumData = await response2.json();
    ReactDOM.render(
        <Ads premium={premiumData.premium ? premiumData.premium : "false"} />,
        document.getElementById('ads')
    );
    // re-render premium mode button too
    ReactDOM.render(
        <PremiumButton premium={premiumData.premium} csrf={data.csrfToken} />,
        document.getElementById('premium')
    );
};

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
const PostList = (props) => utils.PostList(props, loadPostsFromServer);

// get posts and send to PostList
const loadPostsFromServer = async () => {
    const response = await fetch('/getPosts');
    const data = await response.json();
    const response2 = await fetch('/getUserInfo');
    const data2 = await response2.json();
    const response3 = await fetch('/getToken');
    const data3 = await response3.json();
    ReactDOM.render(
        <PostList posts={data.posts} _id={data2._id} csrf={data3.csrfToken} />,
        document.getElementById('content')
    );
}

const init = async () => {
    // get token
    const response = await fetch('/getToken');
    const data = await response.json();
    const response2 = await fetch('/getPremium');
    const premiumData = await response2.json();
    
    // render post form
    ReactDOM.render(
        <PostForm csrf={data.csrfToken} />,
        document.getElementById('makePost')
    );

    // load stuff
    loadPostsFromServer();
    LoadAds();
}

window.onload = init;