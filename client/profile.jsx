// This file handles the profile page with react

const helper = require('./helper.js');
const utils = require('./utils.jsx');

// return "html" of account info
const AccountInfo = (props) => {
    return (
        <div id="accountInfo" className="center-text">
            <h1>{props.username}'S PROFILE</h1>
        </div>
    );
}

// return "html" of password change form
const PasswordChangeForm = (props) => {
    return (
        <form id="passwordChangeForm"
            name="passwordChangeForm"
            onSubmit={handlePasswordChange}
            action="/changePassword"
            method="POST"
            className="input-group vertical col-sm"
        >
            <h3>Change Password</h3>
            <label htmlFor="oldPass">Old password: </label>
            <input id="oldPass" type="password" name="oldPass" placeholder="old password" />
            <label htmlFor="pass">New password: </label>
            <input id="pass" type="password" name="pass" placeholder="new password" />
            <input id="pass2" type="password" name="pass2" placeholder="retype password" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Change password" />
        </form>
    );
}

// check data then send to /changePassword via helper
const handlePasswordChange = (e) => {
    e.preventDefault();
    helper.hideError();

    const oldPass = e.target.querySelector('#oldPass').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    // check if data is good (e.g. no missing field)
    if(!oldPass || !pass || !pass2) {
        helper.handleError('All fields are required!');
        return false;
    }
    if(pass !== pass2) {
        helper.handleError('New passwords do not match!');
        return false;
    }

    // action is /changePassword
    helper.sendPost(e.target.action, {oldPass, pass, pass2, _csrf});

    return false;
}

// return "html" of username change form
const UsernameChangeForm = (props) => {
    return (
        <form id="usernameChangeForm"
            name="usernameChangeForm"
            onSubmit={handleUsernameChange}
            action="/changeUsername" 
            method="POST"
            className="input-group vertical col-sm"
        >
            <h3>Change Username</h3>
            <label htmlFor="oldUser">Old account info: </label>
            <input id="oldUser" type="text" name="oldUser" placeholder="old username" />
            <input id="pass" type="password" name="pass" placeholder="password" />
            <label htmlFor="newUser">New username: </label>
            <input id="newUser" type="text" name="newUser" placeholder="new username" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Change username" />
        </form>
    );
}

// check data then send to /changeUsername via helper
const handleUsernameChange = async (e) => {
    e.preventDefault();
    helper.hideError();

    const oldUser = e.target.querySelector('#oldUser').value;
    const pass = e.target.querySelector('#pass').value;
    const newUser = e.target.querySelector('#newUser').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    // check if data is good (e.g. no missing field)
    if(!oldUser || !pass || !newUser) {
        helper.handleError('All fields are required!');
        return false;
    }

    // action is /changeUsername
    helper.sendPost(e.target.action, {oldUser, pass, newUser, _csrf});

    //helper.sendPost('/changeUsernameOnPosts', {oldUser, pass, newUser, _csrf});

    ReactDOM.render(
        <AccountInfo username={newUser} csrf={_csrf} />,
        document.getElementById('accountInfo')
    );

    return false;
}

const SetPremium = async (e, newPremiumValue) => {
    e.preventDefault();
    helper.hideError();

    const _csrf = e.target.querySelector('#_csrf').value;
    helper.sendPost(e.target.action, {premium: newPremiumValue, _csrf: _csrf});

    // re-render premium mode button
    ReactDOM.render(
        <PremiumButton premium={newPremiumValue} csrf={_csrf} />,
        document.getElementById('premium')
    );

    return false;
}

const PremiumButton = (props) => {
    if(props.premium === "true") return (
        <form id="premiumForm"
            name="premiumForm"
            onSubmit={(e) => SetPremium(e, "false")}
            action="/setPremium"
            method="POST"
            className="premiumForm center-text"
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
            className="premiumForm center-text"
        >
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="premiumButton" type="submit" value="Buy Premium" />
        </form>
    );
}

// list all posts passed in props
const PostList = (props) => utils.PostList(props, loadUserPostsFromServer);

// get current user's posts and send to PostList
const loadUserPostsFromServer = async () => {
    const response = await fetch('/getUserPosts'); 
    const data = await response.json();
    const response2 = await fetch('/getUserInfo');
    const data2 = await response2.json();
    const response3 = await fetch('/getToken');
    const data3 = await response3.json();
    ReactDOM.render(
        <PostList posts={data.posts} _id={data2._id} csrf={data3.csrfToken} />,
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

    ReactDOM.render(
        <AccountInfo username={userData.username} csrf={data.csrfToken} />,
        document.getElementById('accountInfo')
    );

    // render password change form
    ReactDOM.render(
        <PasswordChangeForm csrf={data.csrfToken} />,
        document.getElementById('passwordChange')
    );

    // render username change form
    ReactDOM.render(
        <UsernameChangeForm csrf={data.csrfToken} />,
        document.getElementById('usernameChange')
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