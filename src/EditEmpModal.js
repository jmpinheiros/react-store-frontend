import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

//Componente que altera um Employee

export class EditEmpModal extends Component {
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);

    }

    handleSubmit(event){
        event.preventDefault();
        //fetch(process.env.REACT_APP_API+'employee')
        fetch('http://127.0.0.1:8000/employee/',{
            method:'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                IdEmployee:event.target.IdEmployee.value,
                EmployeeName:event.target.EmployeeName.value
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
            Edit Employee
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

            <Row>
                <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                    {/* add screen para editar nome, pego o id do empartamento que cliquei para editar */}
                    {/* pego a variável empid que veio do render() em Employee e mostro no formulário */}
                        <Form.Group controlId="IdEmployee">
                            <Form.Label> IdEmployee</Form.Label>
                            <Form.Control type="Text" name="IdEmployee" required
                            disable
                            defaultValue={this.props.empid}
                            placeholder="IdEmployee"/>
                        </Form.Group>
                     {/* Dentro do editar nome uso o mesmo form de add employee */}
                     {/* pego a variável empname que veio do render() em Employee e mostro no formulário */}    
                        <Form.Group controlId="EmployeeName">
                            <Form.Label> EmployeeName</Form.Label>
                            <Form.Control type="Text" name="EmployeeName" required
                            defaultValue={this.props.empname}
                            placeholder="EmployeeName"/>

                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Update Employee
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

