(function() {
  window.__CHATAPP = { api_key: document.currentScript && document.currentScript.getAttribute("api_key") };
  var a = document.createElement("link");
  a.rel = "stylesheet";
  a.href = "http://localhost:3000/chat.bundle.css";
  document.getElementsByTagName("head")[0].appendChild(a);
  var b = document.createElement("div");
  b.setAttribute("id", "chatRootElem");
  document.body.appendChild(b);
  var c = document.createElement("script");
  c.src = "http://localhost:3000/chat.bundle.js";
  document.body.appendChild(c);
})();
