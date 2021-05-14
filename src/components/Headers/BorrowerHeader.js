import React from "react";

// reactstrap components

// core components

//images
// "assets/img/buildings.jpg",
// "assets/img/cover.jpg",
// "assets/img/office-1.jpg",
// "assets/img/farid-askerov.jpg",

function BorrowerHeader() { 
  return (
  <>
    <div
    className="page-header page-header-xxs settings-background"
    style={{
      backgroundImage: "url(" +
      require("assets/img/buildings.jpg").default +
      ")"
    }}
    ></div>
    <div className="filter" />
  </>
  )
}

export default BorrowerHeader;
