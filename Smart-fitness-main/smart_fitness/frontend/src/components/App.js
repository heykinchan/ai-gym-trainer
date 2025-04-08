// 在这里写react逻辑
import React, { Component } from "react";
import { createRoot  } from "react-dom";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return <h1>Testing the React Code</h1>;
    }
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />, appDiv);