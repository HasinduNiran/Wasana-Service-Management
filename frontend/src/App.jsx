import React,{useState,useEffect} from 'react'
import { Route, Routes } from 'react-router-dom';
import ShowAllVacancy from './assets/pages/Vacancy/ShowAllVacancy';
import CreateVacancy from './assets/pages/Vacancy/CreateVacancy';
import ReadOneVacancy from './assets/pages/Vacancy/ReadOneVacancy';
import EditVacancy from './assets/pages/Vacancy/EditVacancy';
import DeleteVacancy from './assets/pages/Vacancy/DeleteVacancy';

import ShowAllApplicant from './assets/pages/Applicant/ShowAllApplicant';
import CreateApplicant from './assets/pages/Applicant/CreateApplicant';
import ReadOneApplicant from './assets/pages/Applicant/ReadOneApplicant';
import EditApplicant from './assets/pages/Applicant/EditApplicant';

import CreateEmployee from './assets/pages/Employee/CreateEmployee';
import ShowEmployee from './assets/pages/Employee/ShowEmployee';
import EditEmployee from './assets/pages/Employee/EditEmployee';
import DeleteEmployee from './assets/pages/Employee/DeleteEmployee';
import ReadOneEmployee from './assets/pages/Employee/ReadOneEmployee';
import { CreateVehicle } from './assets/pages/Vehicle/Createvehicle';
import ShowAllvehicle from './assets/pages/Vehicle/ShowAllvehicle';
import EditVehicle from './assets/pages/Vehicle/EditVehicle';
import ReadOneVehicle from './assets/pages/Vehicle/ReadoneVehicle';
import DeleteVehicle from './assets/pages/Vehicle/DeleteVehicle';
import CreateFeedback from './assets/pages/Feedback/CreateFeedback';
import ShowFeedback from './assets/pages/Feedback/ShowFeedback';
import ReadoneFeedback from './assets/pages/Feedback/ReadoneFeedback';
import DeleteFeedback from './assets/pages/Feedback/DeleteFeedback';
import EditFeedback from './assets/pages/Feedback/EditFeedback';
 
const App = () => {
  return (
   <Routes>


  
      <Route path='/vacancy' element={<ShowAllVacancy />} />
      <Route path='/vacancy/create' element={<CreateVacancy />} />
      <Route path='/vacancy/get/:id' element={<ReadOneVacancy />} />
      <Route path='/vacancy/edit/:id' element={<EditVacancy />} />
      <Route path='/vacancy/delete/:id' element={<DeleteVacancy />} />

      <Route path='/applicant' element={<ShowAllApplicant />} />
      <Route path='/applicant/create' element={<CreateApplicant />} />
       <Route path='/applicant/get/:id' element={<ReadOneApplicant />} />
      <Route path='/applicant/edit/:id' element={<EditApplicant />} />
 





    <Route path ='/vehicles' element={<ShowAllvehicle/>}/>
    <Route path ='/vehicles/edit/:id' element={<EditVehicle/>}/>
    <Route path ='/vehicles/:id' element={<ReadOneVehicle/>}/>
    <Route path ='/vehicles/delete/:id' element={<DeleteVehicle/>}/>


    <Route path ='/feedback/create' element={<CreateFeedback/>}/>
    <Route path ='/feedback' element={<ShowFeedback/>}/>
    <Route path ='/feedback/get/:id' element={<ReadoneFeedback/>}/>
    <Route path ='/feedback/delete/:id' element={<DeleteFeedback/>}/>
    <Route path ='/feedback/edit/:id' element={<EditFeedback/>}/>



    <Route path = '/Employee' element = {<ShowEmployee/>}/>
    <Route path = '/Employee/create' element = {<CreateEmployee/>}/>
    <Route path = '/Employee/edit/:id' element = {<EditEmployee/>}/>
    <Route path = '/Employee/delete/:id' element = {<DeleteEmployee/>}/>
    <Route path = '/Employee/:id' element = {<ReadOneEmployee/>}/>
   </Routes>
  );

}

export default App;