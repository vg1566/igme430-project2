(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").textContent=e,document.getElementById("errorBox").classList.remove("hidden")};e.exports={handleError:t,hideError:()=>{document.getElementById("errorBox").classList.add("hidden")},sendPost:async(e,r,a)=>{const m=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),n=await m.json();document.getElementById("errorBox").classList.add("hidden"),n.error&&t(n.error),n.redirect&&(window.location=n.redirect),a&&a(n)}}}},t={};function r(a){var m=t[a];if(void 0!==m)return m.exports;var n=t[a]={exports:{}};return e[a](n,n.exports,r),n.exports}(()=>{const e=r(603),t=e=>React.createElement("form",{id:"postForm",name:"postForm",onSubmit:a,action:"/makePost",method:"POST",className:"input-group vertical"},React.createElement("label",{htmlFor:"mainBody"},"Make a Post! "),React.createElement("textarea",{id:"mainBody",name:"mainBody",placeholder:"Type something here..."}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{type:"submit",value:"Post"})),a=t=>{t.preventDefault(),e.hideError();const r=t.target.querySelector("#mainBody").value,a=t.target.querySelector("#_csrf").value;return r?(e.sendPost(t.target.action,{mainBody:r,_csrf:a},i),!1):(e.handleError("Brevity is the soul of wit, but you must enter <i>something</i>."),!1)},m=async(t,r)=>{t.preventDefault(),e.hideError();const a=r,m=t.target.querySelector("#_csrf").value;return e.sendPost(t.target.action,{isPremium:a,_csrf:m},c),c(),!1},n=e=>"false"===e.premium?React.createElement("div",{id:"ads",className:"adBox"},React.createElement("img",{src:"/assets/img/ad1.jpg",alt:"ad",className:"ad"})):React.createElement("div",null),c=async()=>{const e=await fetch("/getToken"),t=await e.json(),r=await fetch("/getPremium"),a=await r.json();ReactDOM.render(React.createElement(n,{premium:a.premium?a.premium:"false"}),document.getElementById("ads")),ReactDOM.render(React.createElement(o,{premium:a.premium,csrf:t.csrfToken}),document.getElementById("premium"))},o=e=>"true"===e.premium?React.createElement("form",{id:"premiumForm",name:"premiumForm",onSubmit:e=>m(e,"false"),action:"/setPremium",method:"POST",className:"premiumForm"},React.createElement("h3",null,"You have premium!"),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"premiumButton",type:"submit",value:"Remove Premium"})):React.createElement("form",{id:"premiumForm",name:"premiumForm",onSubmit:e=>m(e,"true"),action:"/setPremium",method:"POST",className:"premiumForm"},React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"premiumButton",type:"submit",value:"Buy Premium"})),s=e=>{if(0===e.posts.length)return React.createElement("div",{className:"PostList"},React.createElement("h3",null,"Looks awfully empty here... Why not post something?"));const t=e.posts.reverse().map((e=>React.createElement("div",{key:e._id,className:"post card"},React.createElement("h3",null," From: ",e.username," "),React.createElement("p",null," ",e.mainBody," "))));return React.createElement("div",{className:"postList"},t)},i=async()=>{const e=await fetch("/getPosts"),t=await e.json();ReactDOM.render(React.createElement(s,{posts:t.posts}),document.getElementById("content"))};window.onload=async()=>{const e=await fetch("/getToken"),r=await e.json(),a=await fetch("/getPremium"),m=await a.json();ReactDOM.render(React.createElement(t,{csrf:r.csrfToken}),document.getElementById("makePost")),ReactDOM.render(React.createElement(o,{premium:m.premium,csrf:r.csrfToken}),document.getElementById("premium")),i(),c()}})()})();