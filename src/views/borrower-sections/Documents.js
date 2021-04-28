import React from "react";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Label,
  FormGroup,
  Input,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components

function Documents() {
  return (
    <>
      <div className="section">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" md="8">
              <Table responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Date Added</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Form 1919</td>
                    <td>SBA Forms</td>
                    <td>June 2021</td>
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
                  
                </tbody>
              </Table>              
            </Col>
          </Row>          
        </Container>
      </div>
    </>
  );
}

export default Documents;
