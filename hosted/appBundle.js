(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage")&&(document.getElementById("errorMessage").textContent=e,document.getElementById("errorBox").classList.remove("hidden"))},a=e=>{document.getElementById("normalMessage")&&(document.getElementById("normalMessage").textContent=e,document.getElementById("normalMessageBox").classList.remove("hidden"))},r=()=>{document.getElementById("errorBox").classList.add("hidden"),document.getElementById("normalMessageBox")&&document.getElementById("normalMessageBox").classList.add("hidden")};e.exports={handleError:t,handleMessage:a,hideError:r,sendPost:async(e,m,n)=>{const s=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(m)}),o=await s.json();r(),o.error&&t(o.error),o.message&&a(o.message),o.redirect&&(window.location=o.redirect),n&&n(o)}}}},t={};function a(r){var m=t[r];if(void 0!==m)return m.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,a),n.exports}(()=>{const e=a(603),t=e=>React.createElement("form",{id:"postForm",name:"postForm",onSubmit:r,action:"/makePost",method:"POST",className:"input-group vertical col-sm"},React.createElement("label",{htmlFor:"mainBody"},"Make a Post! "),React.createElement("textarea",{id:"mainBody",name:"mainBody",placeholder:"Type something here..."}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{type:"submit",value:"Post"})),r=t=>{t.preventDefault(),e.hideError();const a=t.target.querySelector("#mainBody").value;t.target.querySelector("#mainBody").value="";const r=t.target.querySelector("#_csrf").value;return a?(e.sendPost(t.target.action,{mainBody:a,_csrf:r},l),!1):(e.handleError("Brevity is the soul of wit, but you cannot post an empty box."),!1)},m=async(t,a)=>{t.preventDefault(),e.hideError();const r=t.target.querySelector("#_csrf").value;return e.sendPost(t.target.action,{premium:a,_csrf:r},o),o(),!1},n=()=>{const e=["/assets/img/ad1.jpg","/assets/img/ad2.jpg"];return`${e[Math.floor(Math.random()*e.length)]}`},s=e=>"false"===e.premium?React.createElement("div",{id:"ads",className:"adBox col-sm"},React.createElement("img",{src:`${n()}`,alt:"ad",className:"ad"})):React.createElement("div",null),o=async()=>{const e=await fetch("/getToken"),t=await e.json(),a=await fetch("/getPremium"),r=await a.json();ReactDOM.render(React.createElement(s,{premium:r.premium?r.premium:"false"}),document.getElementById("ads")),ReactDOM.render(React.createElement(c,{premium:r.premium,csrf:t.csrfToken}),document.getElementById("premium"))},c=e=>"true"===e.premium?React.createElement("form",{id:"premiumForm",name:"premiumForm",onSubmit:e=>m(e,"false"),action:"/setPremium",method:"POST",className:"premiumForm"},React.createElement("h3",null,"You have premium!"),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"premiumButton",type:"submit",value:"Remove Premium"})):React.createElement("form",{id:"premiumForm",name:"premiumForm",onSubmit:e=>m(e,"true"),action:"/setPremium",method:"POST",className:"premiumForm"},React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"premiumButton",type:"submit",value:"Buy Premium"})),i=e=>{if(0===e.posts.length)return React.createElement("div",{className:"PostList"},React.createElement("h3",null,"Looks awfully empty here... Why not post something?"));const t=e.posts.reverse().map((e=>React.createElement("div",{key:e._id,className:"post card fluid"},React.createElement("div",{className:"section dark"},React.createElement("h4",null," ",e.username,": ")),React.createElement("div",{className:"section"},React.createElement("p",null," ",e.mainBody," ")))));return React.createElement("div",{className:"postList col-sm"},t)},l=async()=>{const e=await fetch("/getPosts"),t=await e.json();ReactDOM.render(React.createElement(i,{posts:t.posts}),document.getElementById("content"))};window.onload=async()=>{const e=await fetch("/getToken"),a=await e.json(),r=await fetch("/getPremium"),m=await r.json();ReactDOM.render(React.createElement(t,{csrf:a.csrfToken}),document.getElementById("makePost")),ReactDOM.render(React.createElement(c,{premium:m.premium,csrf:a.csrfToken}),document.getElementById("premium")),l(),o()}})()})();