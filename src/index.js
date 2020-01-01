import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./styles.css";

const App = () => {
  const socket = new WebSocket("wss://azbj6v9fcg.execute-api.us-east-2.amazonaws.com/Prod")

  socket.onopen = () => {
    console.log('Connected')
    // socket.send({ "action": "sendmessage", "data": "sdfsdfsdfsjjjjjj" })
  }

  socket.onerror = error => {
    console.log(`WebSocket error: ${error}`)
  }

  socket.onmessage = (event) => {
    console.log("WebSocket message received:", event)
  };

  return (
    <Provider store={store}>
    </Provider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
