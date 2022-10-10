const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");let o=null,n=!1;t.addEventListener("click",(()=>{n||(o=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`,n=!0}),1e3))})),e.addEventListener("click",(()=>{clearInterval(o),n=!1}));
//# sourceMappingURL=01-color-switcher.aadaa246.js.map
