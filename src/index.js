import "@src/index.scss";
import Main from "@src/Main.js";
import React from "react";
import ReactDOM from "react-dom";
const el = document.createElement("div");
document.body.prepend(el);
ReactDOM.render(<Main />, el);
