import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./SideDrawer.css";
export default function SideDrawer(props) {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={1000}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <div className="side-drawer">{props.children}</div>
    </CSSTransition>
  );
  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
}
