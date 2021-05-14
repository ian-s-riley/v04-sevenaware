import React from "react";

// reactstrap components

// core components

function BorrowerHeader() { 
  return (
  <>
    <div
    className="page-header page-header-xxs settings-background"
    style={{
      backgroundImage: "url(" +
      require("assets/img/farid-askerov.jpg").default +
      ")"
    }}
    ></div>
    <div className="filter" />
  </>
  )
}

export default BorrowerHeader;
