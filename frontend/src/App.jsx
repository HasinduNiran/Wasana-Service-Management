import React,{useState,useEffect} from 'react'
import { Route, Routes } from 'react-router-dom';

import CreateEmployee from './assets/pages/Employee/CreateEmployee';
import ShowEmployee from './assets/pages/Employee/ShowEmployee';
import EditEmployee from './assets/pages/Employee/EditEmployee';
import DeleteEmployee from './assets/pages/Employee/DeleteEmployee';
import ReadOneEmployee from './assets/pages/Employee/ReadOneEmployee';

import ShowEmployeeSalary from './assets/pages/EmployeeSalary/ShowEmployeeSalary';
import CreateEmployeeSalary from './assets/pages/EmployeeSalary/CreateEmployeeSalary';
import EditEmployeeSalary from './assets/pages/EmployeeSalary/EditEmployeeSalary';
import DeleteEmployeeSalary from './assets/pages/EmployeeSalary/DeleteEmployeeSalary';

import CreateStore from './assets/pages/Store/CreateStore';
import ShowStore from './assets/pages/Store/ShowStore';

const App = () => {
  return (
   <Routes>
    
    <Route path = '/Employee' element = {<ShowEmployee/>}/>
    <Route path = '/Employee/create' element = {<CreateEmployee/>}/>
    <Route path = '/Employee/edit/:id' element = {<EditEmployee/>}/>
    <Route path = '/Employee/delete/:id' element = {<DeleteEmployee/>}/>
    <Route path = '/Employee/:id' element = {<ReadOneEmployee/>}/>
    
    <Route path = '/EmployeeSalary' element = {<ShowEmployeeSalary/>}/>
    <Route path = '/EmployeeSalary/create' element = {<CreateEmployeeSalary/>}/>
    <Route path = '/EmployeeSalary/edit/:id' element ={<EditEmployeeSalary/>}/>
    <Route path = '/EmployeeSalary/delete/:id' element = {<DeleteEmployeeSalary/>}/>

    <Route path = '/Store' element = {<ShowStore/>}/>
    <Route path = '/Store/create' element = {<CreateStore/>}/>
   </Routes>
  );
}

export default App;