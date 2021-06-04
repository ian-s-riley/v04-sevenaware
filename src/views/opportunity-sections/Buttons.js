import React from "react";

// reactstrap components
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  CustomInput,
  UncontrolledTooltip,
} from "reactstrap";


function Buttons(prop) {    
  return (
    <div className="">
        {prop.next && prop.back && (
          <>
        <div style={{width: "100px"}}>
        <a href="#">
        <img
        id="tooltip924342354"
        alt="..."
        className="img-circle"
        src={require("assets/img/next-1.jpg").default}
        onClick={prop.next}
        />
        <UncontrolledTooltip delay={0} target="tooltip924342354">
            Next
        </UncontrolledTooltip>
        </a>
        </div>

        <div className="following">
        <a href="#">
            <Button
                className="btn-just-icon"
                color=""
                id="tooltip924342355"
                size="sm"
                onClick={prop.back}
            >
                <i className={"nc-icon nc-minimal-left"} />
            </Button>
            <UncontrolledTooltip delay={0} target="tooltip924342355">
                Back
            </UncontrolledTooltip>
            </a>
        </div>
        </>
        )}   

        {prop.next && !prop.back && (
          <>
        <div style={{width: "100px"}}>
        <img
        id="tooltip924342351"
        alt="..."
        className="img-circle"
        src={require("assets/img/next-1.jpg").default}
        onClick={prop.next}
        />
        <UncontrolledTooltip delay={0} target="tooltip924342351">
            Next
        </UncontrolledTooltip>
        </div>
        </>
        )}        

        {!prop.next && prop.back && (
          <>

        <div className="">
        <a href="#">
            <Button
                className="btn-just-icon"
                color=""
                id="tooltip924342358"
                size="lg"
                onClick={prop.back}
            >
                <i className={"nc-icon nc-minimal-left"} />
            </Button>
            <UncontrolledTooltip delay={0} target="tooltip924342358">
                Back
            </UncontrolledTooltip>
            </a>
        </div>
        </>
        )}  
    </div> 
  )
}

export default Buttons;