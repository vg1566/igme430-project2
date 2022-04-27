(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage")&&(document.getElementById("errorMessage").textContent=e,document.getElementById("errorBox").classList.remove("hidden"))},a=e=>{document.getElementById("normalMessage")&&(document.getElementById("normalMessage").textContent=e,document.getElementById("normalMessageBox").classList.remove("hidden"))},r=()=>{document.getElementById("errorBox").classList.add("hidden"),document.getElementById("normalMessageBox")&&document.getElementById("normalMessageBox").classList.add("hidden")};e.exports={handleError:t,handleMessage:a,hideError:r,sendPost:async(e,s,n)=>{const c=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}),m=await c.json();r(),m.error&&t(m.error),m.message&&a(m.message),m.redirect&&(window.location=m.redirect),n&&n(m)}}}},t={};function a(r){var s=t[r];if(void 0!==s)return s.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,a),n.exports}(()=>{const e=a(603),t=e=>React.createElement("div",{id:"accountInfo",className:"center-text"},React.createElement("h1",null,e.username.toUpperCase(),"'S PROFILE")),r=e=>React.createElement("form",{id:"passwordChangeForm",name:"passwordChangeForm",onSubmit:s,action:"/changePassword",method:"POST",className:"input-group vertical col-sm"},React.createElement("h3",null,"Change password"),React.createElement("label",{htmlFor:"oldPass"},"Old Password: "),React.createElement("input",{id:"oldPass",type:"text",name:"oldPass",placeholder:"old password"}),React.createElement("label",{htmlFor:"pass"},"New Password: "),React.createElement("input",{id:"pass",type:"password",name:"pass",placeholder:"new password"}),React.createElement("input",{id:"pass2",type:"password",name:"pass2",placeholder:"retype password"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"formSubmit",type:"submit",value:"Change password"})),s=t=>{t.preventDefault(),e.hideError();const a=t.target.querySelector("#oldPass").value,r=t.target.querySelector("#pass").value,s=t.target.querySelector("#pass2").value,n=t.target.querySelector("#_csrf").value;return a&&r&&s?r!==s?(e.handleError("New passwords do not match!"),!1):(e.sendPost(t.target.action,{oldPass:a,pass:r,pass2:s,_csrf:n}),!1):(e.handleError("All fields are required!"),!1)},n=async(t,a)=>{t.preventDefault(),e.hideError();const r=t.target.querySelector("#_csrf").value;e.sendPost(t.target.action,{premium:a,_csrf:r});const s=await fetch("/getToken"),n=await s.json();return ReactDOM.render(React.createElement(c,{premium:a,csrf:n.csrfToken}),document.getElementById("premium")),!1},c=e=>"true"===e.premium?React.createElement("form",{id:"premiumForm",name:"premiumForm",onSubmit:e=>n(e,"false"),action:"/setPremium",method:"POST",className:"premiumForm center-text"},React.createElement("h3",null,"You have premium!"),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"premiumButton",type:"submit",value:"Remove Premium"})):React.createElement("form",{id:"premiumForm",name:"premiumForm",onSubmit:e=>n(e,"true"),action:"/setPremium",method:"POST",className:"premiumForm center-text"},React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"premiumButton",type:"submit",value:"Buy Premium"})),m=e=>{if(0===e.posts.length)return React.createElement("div",{className:"PostList"},React.createElement("h3",null,"Looks awfully empty here... Why not post something?"));const t=e.posts.reverse().map((e=>React.createElement("div",{key:e._id,className:"post card fluid"},React.createElement("div",{className:"section dark"},React.createElement("h4",null," ",e.username,": ")),React.createElement("div",{className:"section"},React.createElement("p",null," ",e.mainBody," ")))));return React.createElement("div",{className:"postList col-sm"},t)};window.onload=async()=>{const e=await fetch("/getToken"),a=await e.json(),s=await fetch("/getPremium"),n=await s.json(),o=await fetch("/getUserInfo"),l=await o.json();ReactDOM.render(React.createElement(t,{username:l.username,csrf:a.csrfToken}),document.getElementById("accountInfo")),ReactDOM.render(React.createElement(r,{csrf:a.csrfToken}),document.getElementById("passwordChange")),ReactDOM.render(React.createElement(c,{premium:n.premium,csrf:a.csrfToken}),document.getElementById("premium")),(async()=>{const e=await fetch("/getUserPosts"),t=await e.json();ReactDOM.render(React.createElement(m,{posts:t.posts}),document.getElementById("accountPosts"))})()}})()})();