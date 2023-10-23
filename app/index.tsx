/** ===============================================
 * Author: Epsilon DSVA Team
 * 
 * NOTE: This test and all associated code and data
 * are confidential and are not to be shared with 
 * anyone outside of the Epsilon DSVA team.
 * 
 =================================================*/

import { createRoot } from "react-dom/client";
import { App } from "./src/App";

import "./style/base.scss";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
