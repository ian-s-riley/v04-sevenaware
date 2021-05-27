import React from "react";

// reactstrap components

// core components

function AuthHeader() {
    return (
        <>
        <div
        className="page-header page-header-xxs settings-background"
        style={{
        backgroundImage: "url(" +
        require("assets/img/header-blue-1.jpg").default +
        ")"
        }}
        ></div>
        <div className="filter" />
        </>
    )
}

export default AuthHeader;
