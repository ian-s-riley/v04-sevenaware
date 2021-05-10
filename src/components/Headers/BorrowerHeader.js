import React, {useState, useEffect} from "react";
import { setGlobalCssModule } from "reactstrap/es/utils";

// reactstrap components

// core components

const backgrounds = [
  "assets/img/buildings.jpg",
  "assets/img/cover.jpg",
  "assets/img/office-1.jpg",
  "assets/img/farid-askerov.jpg",,
]

function BorrowerHeader(prop) {
  const [divStyle, setDivStyle] = useState(<>
    <div
    className="page-header page-header-xxs settings-background"
    style={{
      backgroundImage: "url(" +
      require("assets/img/bank1.jpg").default +
      ")"
    }}
    ></div>
    <div className="filter" />
    </>)    

  // useEffect(() => {
  //   setBackground()
  // }, [prop])  

  function setBackground() {
    //choose a random background
    let i = backgrounds.length - 1;
    const j = Math.floor(Math.random() * i) 

    const imgUrl = backgrounds[j];
    let newDivStyle = null

    switch(j) {
     case 1:
      newDivStyle = (
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
      break
      case 2:
      newDivStyle = (
        <>
        <div
        className="page-header page-header-xxs settings-background"
        style={{
          backgroundImage: "url(" +
          require("assets/img/office-1.jpg").default +
          ")"
        }}
        ></div>
        <div className="filter" />
        </>
      )
      break
      case 3:
      newDivStyle = (
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
      break
       default:
        newDivStyle = (
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

    setDivStyle(newDivStyle)
    //console.log('setBackgroundImage - newDivStyle', newDivStyle)
  }
  
  return (divStyle)
}

export default BorrowerHeader;
