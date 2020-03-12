import React from "react";
import PropTypes from "prop-types";
import socketIOClient from "socket.io-client";
import axios from "axios";

const socket = socketIOClient(process.env.API_SERVER_URL);
axios.get(process.env.API_SERVER_URL).then(console.log);

const App = ({ title }) => {
  return <div className="bg-gray-300 p-2">{title}</div>;
};

App.propTypes = {
  title: PropTypes.string,
};

export default App;
