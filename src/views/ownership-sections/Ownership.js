import React from "react";

// reactstrap components
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import { formatDiagnostic } from "typescript";

// core components
import Buttons from "../opportunity-sections/Buttons";

function Ownership(prop) {
    
    //const thisScreenId = "Ownership>"
    let nextScreenId = "Ownership>"        

    const handleNextClick = () => {   
        //validation

        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)
        
        //update the local form store 
        const newForm = null
        
        //update redux & graphql

        //send a notification        
  
        //go to the next step, stage, or form
        prop.nextForm(newForm, screenNavigation)
    };

    const handleBackClick = () => {
      let screenNavigation = Object.assign([], prop.navigation);
      screenNavigation.pop()
      prop.nextForm(null, screenNavigation)
    }

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="d-flex align-items-center justify-content-center" md="3"></Col>
            <Col className="justify-content-center" md="6">
            {prop.form.entityType === "Sole Proprietor" ? (
              <>
              <Row>
              <Col className="d-flex align-items-center justify-content-center" md="1">
              <span className="numberCircle">&#9312;</span>
              </Col>
              <Col className="d-flex align-items-center" md="11">
              Any affiliates (think Franchise/Jobber agreements or other entities that you control?
              </Col>
            </Row>
            <Row>
              <Col className="d-flex align-items-center justify-content-center" md="1">
              <span className="numberCircle">&#9313;</span>
              </Col>
              <Col className="d-flex align-items-center" md="11">
              Any Associates/Key Employees, and or officers or directors?
              </Col>
            </Row>
            </>
            ) : (
              "We need you to list all officers and directors.  We will also have you provide the email address of all equity owners (individuals or entities), officers and or directors. We will send them an email and have them log-in, just as you did, and will have them fill out the information specific to them which is necessary for this application."
            )}

            <Table responsive>
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th>Name</th>
                    <th>Job Title</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">1</td>
                    <td>Andrew Mike</td>
                    <td>Develop</td>
                    <td className="td-actions text-right">
                      <Button
                        className="btn-link mr-1"
                        color="info"
                        data-toggle="tooltip"
                        id="tooltip542628903"
                        size="sm"
                        type="button"
                      >
                        <i className="fa fa-user" />
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="top"
                        target="tooltip542628903"
                      >
                        View Profile
                      </UncontrolledTooltip>
                      <Button
                        className="btn-link mr-1"
                        color="success"
                        data-toggle="tooltip"
                        id="tooltip278266693"
                        size="sm"
                        type="button"
                      >
                        <i className="fa fa-edit" />
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="top"
                        target="tooltip278266693"
                      >
                        Edit Profile
                      </UncontrolledTooltip>
                      <Button
                        className="btn-link"
                        color="danger"
                        data-toggle="tooltip"
                        id="tooltip16493734"
                        size="sm"
                        type="button"
                      >
                        <i className="fa fa-times" />
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="top"
                        target="tooltip16493734"
                      >
                        Remove
                      </UncontrolledTooltip>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">2</td>
                    <td>John Doe</td>
                    <td>Design</td>
                    <td className="td-actions text-right">
                      <Button
                        className="btn-link mr-1"
                        color="info"
                        data-toggle="tooltip"
                        id="tooltip835309420"
                        size="sm"
                        type="button"
                      >
                        <i className="fa fa-user" />
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="top"
                        target="tooltip835309420"
                      >
                        View Profile
                      </UncontrolledTooltip>
                      <Button
                        className="btn-link mr-1"
                        color="success"
                        data-toggle="tooltip"
                        id="tooltip287674338"
                        size="sm"
                        type="button"
                      >
                        <i className="fa fa-edit" />
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="top"
                        target="tooltip287674338"
                      >
                        Edit Profile
                      </UncontrolledTooltip>
                      <Button
                        className="btn-link"
                        color="danger"
                        data-toggle="tooltip"
                        id="tooltip479370246"
                        size="sm"
                        type="button"
                      >
                        <i className="fa fa-times" />
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="top"
                        target="tooltip479370246"
                      >
                        Remove
                      </UncontrolledTooltip>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">3</td>
                    <td>Alex Mike</td>
                    <td>Design</td>
                    <td className="td-actions text-right">
                      <Button
                        className="btn-link mr-1"
                        color="info"
                        data-toggle="tooltip"
                        id="tooltip594620504"
                        size="sm"
                        type="button"
                      >
                        <i className="fa fa-user" />
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="top"
                        target="tooltip594620504"
                      >
                        View Profile
                      </UncontrolledTooltip>
                      <Button
                        className="btn-link mr-1"
                        color="success"
                        data-toggle="tooltip"
                        id="tooltip716621284"
                        size="sm"
                        type="button"
                      >
                        <i className="fa fa-edit" />
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="top"
                        target="tooltip716621284"
                      >
                        Edit Profile
                      </UncontrolledTooltip>
                      <Button
                        className="btn-link"
                        color="danger"
                        data-toggle="tooltip"
                        id="tooltip329473987"
                        size="sm"
                        type="button"
                      >
                        <i className="fa fa-times" />
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="top"
                        target="tooltip329473987"
                      >
                        Remove
                      </UncontrolledTooltip>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">4</td>
                    <td>Mike Monday</td>
                    <td>Marketing</td>
                    <td className="td-actions text-right">
                      <Button
                        className="btn-link mr-1"
                        color="info"
                        data-toggle="tooltip"
                        id="tooltip673879542"
                        size="sm"
                        type="button"
                      >
                        <i className="fa fa-user" />
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="top"
                        target="tooltip673879542"
                      >
                        View Profile
                      </UncontrolledTooltip>
                      <Button
                        className="btn-link mr-1"
                        color="success"
                        data-toggle="tooltip"
                        id="tooltip661394722"
                        size="sm"
                        type="button"
                      >
                        <i className="fa fa-edit" />
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="top"
                        target="tooltip661394722"
                      >
                        Edit Profile
                      </UncontrolledTooltip>
                      <Button
                        className="btn-link"
                        color="danger"
                        data-toggle="tooltip"
                        id="tooltip755642510"
                        size="sm"
                        type="button"
                      >
                        <i className="fa fa-times" />
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="top"
                        target="tooltip755642510"
                      >
                        Remove
                      </UncontrolledTooltip>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">5</td>
                    <td>Paul Dickens</td>
                    <td>Communication</td>
                    <td className="td-actions text-right">
                      <Button
                        className="btn-link mr-1"
                        color="info"
                        data-toggle="tooltip"
                        id="tooltip836884478"
                        size="sm"
                        type="button"
                      >
                        <i className="fa fa-user" />
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="top"
                        target="tooltip836884478"
                      >
                        View Profile
                      </UncontrolledTooltip>
                      <Button
                        className="btn-link mr-1"
                        color="success"
                        data-toggle="tooltip"
                        id="tooltip531808427"
                        size="sm"
                        type="button"
                      >
                        <i className="fa fa-edit" />
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="top"
                        target="tooltip531808427"
                      >
                        Edit Profile
                      </UncontrolledTooltip>
                      <Button
                        className="btn-link"
                        color="danger"
                        data-toggle="tooltip"
                        id="tooltip875159762"
                        size="sm"
                        type="button"
                      >
                        <i className="fa fa-times" />
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="top"
                        target="tooltip875159762"
                      >
                        Remove
                      </UncontrolledTooltip>
                    </td>
                  </tr>
                </tbody>
              </Table>
            

            </Col>
              
            <Col className="d-flex align-items-center justify-content-center" md="3">
            <Buttons next={handleNextClick} back={handleBackClick}/>
            </Col>
        </Row>
        </Container>
    </div>

  );
}

export default Ownership;
