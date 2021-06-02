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
    <div className="avatar">
        <img
        alt="..."
        className="img-circle img-responsive"
        src={require("assets/img/next-1.jpg").default}
        onClick={prop.next}
        />
        {!prop.hideBack && (
        <div className="following">
        <a href="#">
            <Button
                className="btn-just-icon"
                color=""
                id="tooltip924342351"
                size="md"
                onClick={prop.back}
            >
                <i className={"nc-icon nc-minimal-left"} />
            </Button>
            <UncontrolledTooltip delay={0} target="tooltip924342351">
                Back
            </UncontrolledTooltip>
            </a>
        </div>
        )}        
    </div> 
  )
}

export default Buttons;