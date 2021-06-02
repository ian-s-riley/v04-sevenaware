import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function AuthHeader() {

  return (
    <>
      <div
      className="page-header page-header-xxs settings-background"
      style={{
        backgroundImage: "url(" +
        require("assets/img/cover-1.jpg").default +
        ")"
      }}
      ></div>
      <div className="filter" />
    </>
    )
}

export default AuthHeader;
