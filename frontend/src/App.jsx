import React,{useState,useEffect} from 'react'
import { Route, Routes } from 'react-router-dom';

import CreateEmployee from './assets/pages/Employee/CreateEmployee';
import ShowEmployee from './assets/pages/Employee/ShowEmployee';
import EditEmployee from './assets/pages/Employee/EditEmployee';
import DeleteEmployee from './assets/pages/Employee/DeleteEmployee';
import ReadOneEmployee from './assets/pages/Employee/ReadOneEmployee';
const App = () => {
  return (
   <Routes>
    
    <Route path = '/Employee' element = {<ShowEmployee/>}/>
    <Route path = '/Employee/create' element = {<CreateEmployee/>}/>
    <Route path = '/Employee/edit/:id' element = {<EditEmployee/>}/>
    <Route path = '/Employee/delete/:id' element = {<DeleteEmployee/>}/>
    <Route path = '/Employee/:id' element = {<ReadOneEmployee/>}/>
   </Routes>
  );
}

export default App;