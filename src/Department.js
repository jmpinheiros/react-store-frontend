import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
//require('dotenv').config();

//import para add departament
import {Button, ButtonToolbar} from 'react-bootstrap';
import { AddDepModal } from './AddDepModal';
import { EditDepModal } from './EditDepModal';

export class Department extends Component{

    //add um construtor nesse componente, ele serve para pegarmos dados da api
    //dados carregados em um array {deps:[]} após consulta à api
    constructor(props){
        super(props);
        this.state = { deps: [], addModalShow:false, editModalShow:false}
    //addModalShow é variável para mostrar ou ocultar screen de add um departamento
    //aditModalShow variável para editar um departamento
    }

    refreshList(){
        //esse metodo pega dado da api /department
        //fetch(process.env.REACT_APP_API+'department/')
        fetch('http://127.0.0.1:8000/department/')
        .then(response=>response.json())
        //.then(console.log)
        .then(data=>{
            this.setState({deps:data});//uma vez que o dado tá disponivel, atualizados o array department deps[]
        });

    }

    // chamando o metodo refresh dentro do didmount que carrega dados externos 
    componentDidMount(){
        this.refreshList();
    }
    // atualizando o array tmb, pode gerar loop infiniito se não for bem tratado
    // atualizo apenas se houver mudança entre props inicial(prevProps) e atual (props)
    componentDidUpdate(prevProps){
        if(this.props.IdDepartment !== prevProps.IdDepartment){
            this.fetchData(this.props.IdDepartment);
            //this.refreshList(); loop infinito
        }
        
    }
//passo json com metodo DELETE para o back deletar o departamento pelo id
    deleteDep(depid){
        if(window.confirm('Deletar Departamento ?')){
            fetch('http://127.0.0.1:8000/department/'+depid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }


    }

    render(){
        const {deps, depid, depname}=this.state;//add o array {deps} a uma tabela bootstrap, depid e depname para o editar departamento depois
        let addModalClose=()=>this.setState({addModalShow:false}); //add screen department
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className='mt-4' striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>IdDepartment</th>
                        <th>DepartmentName</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map((dep)=>
                            <tr key={dep.IdDepartment}>
                                <td>{dep.IdDepartment}</td>
                                <td>{dep.DepartmentName}</td>
                                <td>
<ButtonToolbar>
    <Button className='mr-2' variant='info'
    onClick={()=>this.setState({editModalShow:true,
        depid:dep.IdDepartment,depname:dep.DepartmentName})}>
            Edit
        </Button>
 {/* O botão delete usa uma função que consome endpoint e usa verbo DELETE do backend*/}
        <Button className='mr-2' variant='danger'
        onClick={()=>this.deleteDep(dep.IdDepartment)}>
            Delete

        </Button>
        <EditDepModal show={this.state.editModalShow}
        onHide={editModalClose}
        depid={depid}
        depname={depname}/>

</ButtonToolbar>


                                </td>

                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Department
                        </Button>
                
                        <AddDepModal show={this.state.addModalShow}
                        onHide={addModalClose}></AddDepModal>

                </ButtonToolbar>


            </div>

        )
    }
}