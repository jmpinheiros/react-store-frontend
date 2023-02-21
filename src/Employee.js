import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import { AddEmpModal } from './AddEmpModal';
import { EditEmpModal } from './EditEmpModal';


export class Employee extends Component{
    constructor(props){
        super(props);
        this.state = {emps:[], addModalShow:false, editModalShow:false} 
    }
    refreshList(){
        //fetch(process.env.REACT_APP_API+'employee/')
        fetch('http://127.0.0.1:8000/employee/')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});//atualizar emps
        });

    }
    componentDidMount(){
        this.refreshList();
    }
    componentDidUpdate(prevProps){
        if(this.props.IdEmployee !== prevProps.IdEmployee){
            this.fetchData(this.props.IdEmployee);
            //this.refreshList(); loop infinito
        }
        
    }
    deleteEmp(empid){
        if(window.confirm('Deletar Empregado ?')){
            fetch('http://127.0.0.1:8000/employee/'+empid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }


    }

    
      
    render(){
        const {emps, empid, empname,depmt,photofilename,doj}=this.state;//add variável para uso no formulário
        let addModalClose=()=>this.setState({addModalShow:false}); //add screen employee
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className='mt-4' striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>IdEmployee</th>
                        <th>EmployeeName</th>
                        <th>Department</th>
                        <th>DateOfJoining</th>
                        
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map((emp)=>
                            <tr key={emp.IdEmployee}>
                                <td>{emp.IdEmployee}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.DateOfJoining}</td>
                                
                                <td>
<ButtonToolbar>
    <Button className='mr-2' variant='info'
    onClick={()=>this.setState({editModalShow:true,
        empid:emp.IdEmployee,empname:emp.EmployeeName,depmt:emp.Department,
        photofilename:emp.PhotoFileName,doj:emp.DateOfJoining})}>
            Edit
        </Button>
 {/* O botão delete usa uma função que consome endpoint e usa verbo DELETE do backend*/}
        <Button className='mr-2' variant='danger'
        onClick={()=>this.deleteEmp(emp.IdEmployee)}>
            Delete

        </Button>
        <EditEmpModal show={this.state.editModalShow}
        onHide={editModalClose}
        empid={empid}
        empname={empname}
        depmt={depmt}
        photofilename={photofilename}
        doj={doj}
        />

</ButtonToolbar>


                                </td>

                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Employee
                        </Button>
                
                        <AddEmpModal show={this.state.addModalShow}
                        onHide={addModalClose}></AddEmpModal>

                </ButtonToolbar>


            </div>

        )
    }





}