import React, {useState, useEffect} from "react";

// reactstrap components

// core components

const backgrounds = [
  "assets/img/buildings.jpg",
  "assets/img/cover.jpg",
  "assets/img/office-1.jpg",
  "assets/img/farid-askerov.jpg",,
]

function AuthHeader() {
    return (
        <>
        <div
        className="page-header page-header-xxs settings-background"
        style={{
        backgroundImage: "url(" +
        require("assets/img/cover.jpg").default +
        ")"
        }}
        ></div>
        <div className="filter" />
        </>
    )
}

export default AuthHeader;
