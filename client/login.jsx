// This file handles logins with react

const helper = require('./helper.js');

// process data in form and send to sendPost
const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    // check if data is good (e.g. no missing field)
    if(!username || !pass) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    // action is /login through router 
    helper.sendPost(e.target.action, {username, pass, _csrf});

    return false;
}

// process data in form and send to sendPost
const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    // check if data is good (e.g. no missing field)
    if(!username || !pass || !pass2) {
        helper.handleError('All fields are required!');
        return false;
    }
    if(pass !== pass2) {
        helper.handleError('Passwords do not match!');
        return false;
    }

    // action is /signup
    helper.sendPost(e.target.action, {username, pass, pass2, _csrf});

    return false;
}

// returns "html" of login form to display on view
const LoginWindow = (props) => {
    return (
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm input-group vertical"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Log in" />
        </form>
    );
}

// return "html" of signup form to display on view
const SignupWindow = (props) => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm input-group vertical"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <input id="pass2" type="password" name="pass2" placeholder="retype password" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign up" />
        </form>
    );
}

const init = async () => {
    // get token
    const response = await fetch('/getToken');
    const data = await response.json();

    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    
    // hook up event listeners (windows to buttons)
    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<LoginWindow csrf={data.csrfToken} />,
            document.getElementById('content'));
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<SignupWindow csrf={data.csrfToken} />,
            document.getElementById('content'));
        return false;
    });

    // render login
    ReactDOM.render(<LoginWindow csrf={data.csrfToken} />,
        document.getElementById('content'));
}

window.onload = init;