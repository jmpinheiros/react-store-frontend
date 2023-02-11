import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

//Componente que adicona um Department

export class AddDepModal extends Component {
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);

    }

    handleSubmit(event){
        event.preventDefault();
        //fetch(process.env.REACT_APP_API+'department')
        fetch('http://127.0.0.1:8000/department/',{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                IdDepartment:null,//id é gerado automaticamente no back
                DepartmentName:event.target.DepartmentName.value
            })
        })
        .then(res=>res.json())
        .then((result) => {
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
        
    }

    render(){
        return(
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add Department
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

            <Row>
                <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="DepartmentName">
                            <Form.Label> DepartmentName</Form.Label>
                            <Form.Control type="Text" name="DepartmentName" required
                            placeholder="DepartmentName"/>
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Add Department
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>

    </Modal.Body>

    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>
            </div>

                )
    }
}
