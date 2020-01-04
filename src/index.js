import "@src/index.scss";
import Main from "@src/Main.js";
const el = document.createElement("div");
document.body.insertBefore(el, document.querySelector("body script"));
ReactDOM.render(<Main />, el);
