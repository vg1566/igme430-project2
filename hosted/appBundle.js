(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage")&&(document.getElementById("errorMessage").textContent=e,document.getElementById("errorBox").classList.remove("hidden"))},a=e=>{document.getElementById("normalMessage")&&(document.getElementById("normalMessage").textContent=e,document.getElementById("normalMessageBox").classList.remove("hidden"))},r=()=>{document.getElementById("errorBox").classList.add("hidden"),document.getElementById("normalMessageBox")&&document.getElementById("normalMessageBox").classList.add("hidden")};e.exports={handleError:t,handleMessage:a,hideError:r,sendPost:async(e,n,m)=>{const s=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}),c=await s.json();r(),c.error&&t(c.error),c.message&&a(c.message),c.redirect&&(window.location=c.redirect),m&&m(c)}}}},t={};function a(r){var n=t[r];if(void 0!==n)return n.exports;var m=t[r]={exports:{}};return e[r](m,m.exports,a),m.exports}(()=>{const e=a(603),t=e=>React.createElement("form",{id:"postForm",name:"postForm",onSubmit:r,action:"/makePost",method:"POST",className:"input-group vertical col-sm"},React.createElement("label",{htmlFor:"mainBody"},"Make a Post! "),React.createElement("textarea",{id:"mainBody",name:"mainBody",placeholder:"Type something here..."}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{type:"submit",value:"Post"})),r=t=>{t.preventDefault(),e.hideError();const a=t.target.querySelector("#mainBody").value;t.target.querySelector("#mainBody").value="";const r=t.target.querySelector("#_csrf").value;return a?(e.sendPost(t.target.action,{mainBody:a,_csrf:r},l),!1):(e.handleError("Brevity is the soul of wit, but you cannot post an empty box."),!1)},n=async(t,a)=>{t.preventDefault(),e.hideError();const r=t.target.querySelector("#_csrf").value;return e.sendPost(t.target.action,{premium:a,_csrf:r},c),c(),!1},m=()=>{const e=["/assets/img/ad1.jpg","/assets/img/ad2.jpg"];return`${e[Math.floor(Math.random()*e.length)]}`},s=e=>"false"===e.premium?React.createElement("div",{id:"ads",className:"adBox col-sm"},React.createElement("img",{src:`${m()}`,alt:"ad",className:"ad"})):React.createElement("div",null),c=async()=>{const e=await fetch("/getToken"),t=await e.json(),a=await fetch("/getPremium"),r=await a.json();ReactDOM.render(React.createElement(s,{premium:r.premium?r.premium:"false"}),document.getElementById("ads")),ReactDOM.render(React.createElement(o,{premium:r.premium,csrf:t.csrfToken}),document.getElementById("premium"))},o=e=>"true"===e.premium?React.createElement("form",{id:"premiumForm",name:"premiumForm",onSubmit:e=>n(e,"false"),action:"/setPremium",method:"POST",className:"premiumForm"},React.createElement("h3",null,"You have premium!"),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"premiumButton",type:"submit",value:"Remove Premium"})):React.createElement("form",{id:"premiumForm",name:"premiumForm",onSubmit:e=>n(e,"true"),action:"/setPremium",method:"POST",className:"premiumForm"},React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"premiumButton",type:"submit",value:"Buy Premium"})),i=t=>{if(0===t.posts.length)return React.createElement("div",{className:"PostList"},React.createElement("h3",null,"Looks awfully empty here... Why not post something?"));const a=t.posts.reverse().map((a=>a.poster===t._id?React.createElement("div",{key:a._id,className:"post card fluid"},React.createElement("div",{className:"section dark"},React.createElement("h4",null," ",a.username,": ")),React.createElement("div",{className:"section"},React.createElement("p",null," ",a.mainBody," ")),React.createElement("form",{name:"deleteForm",action:"/deletePost",onSubmit:r=>{r.preventDefault(),e.hideError(),e.sendPost(r.target.action,{postId:a._id,_csrf:t.csrf},l)},method:"POST"},React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:t.csrf}),React.createElement("input",{className:"deleteButton",type:"submit",value:"Delete Post"}))):React.createElement("div",{key:a._id,className:"post card fluid"},React.createElement("div",{className:"section dark"},React.createElement("h4",null," ",a.username,": ")),React.createElement("div",{className:"section"},React.createElement("p",null," ",a.mainBody," ")))));return React.createElement("div",{className:"postList col-sm"},a)},l=async()=>{const e=await fetch("/getPosts"),t=await e.json(),a=await fetch("/getUserInfo"),r=await a.json(),n=await fetch("/getToken"),m=await n.json();ReactDOM.render(React.createElement(i,{posts:t.posts,_id:r._id,csrf:m.csrfToken}),document.getElementById("content"))};window.onload=async()=>{const e=await fetch("/getToken"),a=await e.json(),r=await fetch("/getPremium"),n=await r.json();ReactDOM.render(React.createElement(t,{csrf:a.csrfToken}),document.getElementById("makePost")),ReactDOM.render(React.createElement(o,{premium:n.premium,csrf:a.csrfToken}),document.getElementById("premium")),l(),c()}})()})();