import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

//Componente que altera um Department

export class EditDepModal extends Component {
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);

    }

    handleSubmit(event){
        event.preventDefault();
        //fetch(process.env.REACT_APP_API+'department')
        fetch('http://127.0.0.1:8000/department/',{
            method:'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                IdDepartment:event.target.IdDepartment.value,
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
            Edit Department
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

            <Row>
                <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                    {/* add screen para editar nome, pego o id do departamento que cliquei para editar */}
                    {/* pego a variável depid que veio do render() em Department e mostro no formulário */}
                        <Form.Group controlId="IdDepartment">
                            <Form.Label> IdDepartment</Form.Label>
                            <Form.Control type="Text" name="IdDepartment" required
                            placeholder="IdDepartment"
                            disabled
                            defaultValue={this.props.depid}/>
                            
                        </Form.Group>

                     {/* Dentro do editar nome uso o mesmo form de add department */}
                     {/* pego a variável depname que veio do render() em Department e mostro no formulário */}    
                        <Form.Group controlId="DepartmentName">
                            <Form.Label> DepartmentName</Form.Label>
                            <Form.Control type="Text" name="DepartmentName" required
                            defaultValue={this.props.depname}
                            placeholder="DepartmentName"/>

                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Update Department
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

