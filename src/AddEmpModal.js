import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';

// Teste Variáveis ambiente
let REACT_APP_API = 'http://127.0.0.1:8000/'
let REACT_APP_PHOTOPATH = 'http://127.0.0.1:8000/media/'


//Componente que altera um Employee
export class AddEmpModal extends Component {
    constructor(props){
        super(props);
        this.state={deps:[]};//add departamentos para mostrá-los no dropdown
        this.handleSubmit=this.handleSubmit.bind(this);// bind metodo que faz o POST 
        this.handleFileSelected=this.handleFileSelected.bind(this);// bind o puload da imagem

    }


    //variáveis para salvar detalhes da foto
    photofilename = 'jow.png';

    //imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;
    imagesrc = REACT_APP_PHOTOPATH+this.photofilename;
    //imagesrc = 'http://127.0.0.1:8000/media/'+this.photofilename;
    
    // popular o dropdown do componentdidmount com o array deps
    componentDidMount(){
        //fetch(process.env.REACT_APP_API+'department')
        fetch('http://127.0.0.1:8000/department/')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps: data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        //fetch(process.env.REACT_APP_API+'employee')
        fetch('http://127.0.0.1:8000/employee/',{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                IdEmployee:null,
                EmployeeName:event.target.EmployeeName.value,
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
            Add Employee
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

            <Row>
                <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                    
                        <Form.Group controlId="EmployeeName">
                            <Form.Label> EmployeeName</Form.Label>
                            <Form.Control type="Text" name="EmployeeName" required
                            placeholder="EmployeeName"/>
                        </Form.Group>

                        <Form.Group controlId="Department">
                            <Form.Label> Department</Form.Label>
                            <Form.Control as="select">
                                {this.state.deps.map(dep=>
                                    <option key={dep.IdDepartment}>{dep.DepartmentName}</option>)}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="DateOfJoining">
                            <Form.Label> DateOfJoining</Form.Label>
                            <Form.Control 
                            type="date"
                            name="DateOfJoining"
                            required
                            placeholder="DateOfJoining"
                            />

                        </Form.Group>
                        
                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Add Employee
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>

                <Col sm={6}>
                {/* add Imagem */}
                    <Image width="200px" height="200px" src={this.imagesrc}/>
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

