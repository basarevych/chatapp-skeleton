(function() {
  window.__CHATAPP = { api_key: document.currentScript && document.currentScript.getAttribute("api_key") };
  var a1 = document.createElement("link");
  a1.rel = "stylesheet";
  a1.href = "http://localhost:3000/script.css";
  document.getElementsByTagName("head")[0].appendChild(a1);
  var a2 = document.createElement("link");
  a2.rel = "stylesheet";
  a2.href = "http://localhost:3000/chat.bundle.css";
  document.getElementsByTagName("head")[0].appendChild(a2);
  var b = document.createElement("div");
  b.setAttribute("id", "chatRootElem");
  document.body.appendChild(b);
  var c = document.createElement("script");
  c.src = "http://localhost:3000/chat.bundle.js";
  document.body.appendChild(c);
})();
