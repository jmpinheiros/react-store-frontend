import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';

// Teste Variáveis ambiente
const REACT_APP_API = 'http://localhost:8000/'
const REACT_APP_PHOTOPATH = 'http://localhost:8000/media/'


//Componente que altera um Employee
export class EditEmpModal extends Component {
    constructor(props){
        super(props);
        this.state={deps:[]}; 
        this.handleSubmit=this.handleSubmit.bind(this);// bind metodo que faz o POST 
        this.handleFileSelected=this.handleFileSelected.bind(this);// bind o upload da imagem
    
    }


    //variáveis para salvar detalhes da foto
    photofilename = 'jow.png';

    //imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;
    imagesrc = REACT_APP_PHOTOPATH+this.photofilename;
    //imagesrc = 'http://127.0.0.1:8000/media/'+this.photofilename;
    
    // popular o dropdown do componentdidmount com o array deps
    componentDidMount(){
        //fetch(process.env.REACT_APP_API+'department')
        fetch(REACT_APP_API+'department/')
        //fetch('http://localhost:8000/department/')
        .then(response=>response.json())
        
        .then(data=>{
            this.setState({deps: data});
        }).catch(error => console.error(error));

    }

    handleSubmit(event){
        event.preventDefault();
        //fetch(process.env.REACT_APP_API+'employee/',{
        fetch(REACT_APP_API+'employee/',{
            method:'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                IdEmployee:event.target.IdEmployee.value,
                EmployeeName:event.target.EmployeeName.value,
                //Department:this.state.selectedDepId,
                Department:event.target.Department.value,
                DateOfJoining:event.target.DateOfJoining.value,
                PhotoFileName:this.photofilename
            })
        })
        .then(res=>res.json())
        .then((result) => {
            alert(result);
        },
        (error)=>{
            alert('Failed Add Employee');
        })
        
    }
    
    //add método para salvar a foto passada, uso data do form e append file nele
    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );
        fetch(REACT_APP_API+'employee/saveFile/',{
        //fetch(process.env.REACT_APP_API+'employee/saveFile/',{
        //fetch('http://127.0.0.1:8000/employee/saveFile/',{
            method:'POST',
            body:formData
        })
        //se tudo for com sucesso, atualizado imagesrc
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=REACT_APP_PHOTOPATH+result;
            //this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
            //this.imagesrc='http://127.0.0.1:8000/media/'+result;
        },
        (error)=>{
            alert('Failed File Upload');
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
                        
                        <Form.Group controlId="IdEmployee">
                            <Form.Label> IdEmployee</Form.Label>
                            <Form.Control type="Text" name="IdEmployee" required
                            placeholder="IdEmployee"
                            disabled
                            defaultValue={this.props.empid}/>
                        </Form.Group>

                        <Form.Group controlId="EmployeeName">
                            <Form.Label> EmployeeName</Form.Label>
                            <Form.Control type="Text" name="EmployeeName" required
                            defaultValue={this.props.empname}
                            placeholder="EmployeeName"/>
                        </Form.Group>

                    {/* Mostro o nomeDep mas pego o IdDep para salvar **/}
                    <Form.Group controlId="Department">
                        <Form.Label>Department</Form.Label>
                        <Form.Control as="select" name="Department" defaultValue={this.props.depmt}>
                            {this.state.deps.map(dep =>
                            <option key={dep.IdDepartment} value={dep.IdDepartment}>{dep.DepartmentName}</option>
                            )}
                        </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="DateOfJoining">
                            <Form.Label> DateOfJoining</Form.Label>
                            <Form.Control 
                            type="date"
                            name="DateOfJoining"
                            required
                            placeholder="DateOfJoining"
                            defaultValue={this.props.doj}
                            />

                        </Form.Group>
                        
                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Update Employee
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>

                <Col sm={6}>
                {/* add Imagem */}
                    <Image width="200px" height="200px"
                    src={REACT_APP_PHOTOPATH+this.props.photofilename}/>
                    <input onChange={this.handleFileSelected} type="File"/>
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

