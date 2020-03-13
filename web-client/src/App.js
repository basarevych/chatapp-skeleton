import React from "react";
import PropTypes from "prop-types";
import socketIOClient from "socket.io-client";
import axios from "axios";

const socket = socketIOClient(process.env.API_SERVER_URL);
axios.get(process.env.API_SERVER_URL).then(console.log);

function getParameterByName(name) {
  if (window.CHAT_PARAMS[name]) return window.CHAT_PARAMS[name];
  var match = RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

const App = ({ title }) => {
  return (
    <>
      <div className="chat-bg-gray-300 chat-p-2">{title}</div>
      <div>API KEY: {getParameterByName("api_key")}</div>
    </>
  );
};

App.propTypes = {
  title: PropTypes.string,
};

export default App;
