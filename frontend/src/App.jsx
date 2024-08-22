import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import ShowAllVacancy from './assets/pages/Vacancy/ShowAllVacancy';
import CreateVacancy from './assets/pages/Vacancy/CreateVacancy';
import ReadOneVacancy from './assets/pages/Vacancy/ReadOneVacancy';
import EditVacancy from './assets/pages/Vacancy/EditVacancy';


import ShowAllApplicant from './assets/pages/Applicant/ShowAllApplicant';
import CreateApplicant from './assets/pages/Applicant/CreateApplicant';
import ReadOneApplicant from './assets/pages/Applicant/ReadOneApplicant';
import EditApplicant from './assets/pages/Applicant/EditApplicant';

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
import EditStore from './assets/pages/Store/EditStore';
import DeleteStore from './assets/pages/Store/DeleteStore';
import ReadOneStore from './assets/pages/Store/ReadOneStore';

import CreateRepair from './assets/pages/Repair/CreateRepair';
import EditRepair from './assets/pages/Repair/EditRepair';
import DeleteRepair from './assets/pages/Repair/DeleteRepair';
import ReadOneRepair from './assets/pages/Repair/ReadOneRepair';
import ShowRepair from './assets/pages/Repair/ShowRepair';

import CreateInquire from './assets/pages/Inquire/CreateInquire';
import ShowInquire from './assets/pages/Inquire/ShowInquire';
import EditInquire from './assets/pages/Inquire/EditInquire';
import DeleteInquire from './assets/pages/Inquire/DeleteInquire';
import ReadOneInquire from './assets/pages/Inquire/ReadOneInquire';



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


import CreateServiceHistory from './assets/pages/ServiceHistory/CreateServiceHistory';
import EditShowHistory from './assets/pages/ServiceHistory/EditShowHistory';
import DeleteShowHistory from './assets/pages/ServiceHistory/DeleteShowHistory';
import ReadoneShowHistory from './assets/pages/ServiceHistory/ReadoneShowHistory';
import ShowAllServiceHistory from './assets/pages/ServiceHistory/ShowAllServiceHistory';


import CreatePromotion from './assets/pages/Promotion/CreatePromotion';
import EditPromotion from './assets/pages/Promotion/EditPromotion';
import ShowAllPromotion from './assets/pages/Promotion/ShowAllPromotion';
import DeletePromotion from './assets/pages/Promotion/DeletePromotion';
import ReadOnePromotion from './assets/pages/Promotion/ReadOnePromotion';

import ShowAllBooking from './assets/pages/Booking/ShowAllBooking';
import CreateBooking from './assets/pages/Booking/CreateBooking';
import EditBooking from './assets/pages/Booking/EditBooking';
import ReadOneBooking from './assets/pages/Booking/ReadoneBooking';

import CLogin from './assets/components/cLogin';



 


const App = () => {
  return (
    <Routes>

      <Route path='/cLogin' element={<CLogin />}></Route>'


      <Route path='/vacancy' element={<ShowAllVacancy />} />
      <Route path='/vacancy/create' element={<CreateVacancy />} /> {/*used this route to check tailwind css*/}
      <Route path='/vacancy/get/:id' element={<ReadOneVacancy />} />
      <Route path='/vacancy/edit/:id' element={<EditVacancy />} />
      

      <Route path='/applicant' element={<ShowAllApplicant />} />
      <Route path='/applicant/create' element={<CreateApplicant />} />
      <Route path='/applicant/get/:id' element={<ReadOneApplicant />} />
      <Route path='/applicant/edit/:id' element={<EditApplicant />} />



    <Route path ='/vehicles' element={<ShowAllvehicle/>}/>
    <Route path ='/vehicles/edit/:id' element={<EditVehicle/>}/>
    <Route path ='/vehicles/:id' element={<ReadOneVehicle/>}/>
    <Route path ='/vehicles/delete/:id' element={<DeleteVehicle/>}/>
    <Route path ='/vehicles/create' element={<CreateVehicle/>}/>


      <Route path='/vehicles' element={<ShowAllvehicle />} />
      <Route path='/vehicles/edit/:id' element={<EditVehicle />} />
      <Route path='/vehicles/:id' element={<ReadOneVehicle />} />
      <Route path='/vehicles/delete/:id' element={<DeleteVehicle />} />


      <Route path='/feedback/create' element={<CreateFeedback />} />
      <Route path='/feedback' element={<ShowFeedback />} />
      <Route path='/feedback/get/:id' element={<ReadoneFeedback />} />
      <Route path='/feedback/delete/:id' element={<DeleteFeedback />} />
      <Route path='/feedback/edit/:id' element={<EditFeedback />} />

      <Route path='/ServiceHistory/create' element={<CreateServiceHistory />} />



      <Route path='/Promotion/Create' element={<CreatePromotion />} />
      <Route path='/Promotion/edit/:id' element={<EditPromotion />} />
      <Route path='/Promotion/delete/:id' element={<DeletePromotion />} />
      <Route path='/Promotion' element={<ShowAllPromotion />} />
      <Route path='/Promotion/:id' element={<ReadOnePromotion />} />

    <Route path = '/ServiceHistory/create' element = {<CreateServiceHistory/>}/>
    <Route path = '/ServiceHistory/edit/:id' element = {<EditShowHistory/>}/>
    <Route path = '/ServiceHistory/delete/:id' element = {<DeleteShowHistory/>}/>
    <Route path = '/ServiceHistory/:id' element = {<ReadoneShowHistory/>}/>
    <Route path = '/ServiceHistory' element = {<ShowAllServiceHistory/>}/>
  


      <Route path='/Booking' element={<ShowAllBooking />} />
      <Route path='/Booking/create' element={<CreateBooking />} />
      <Route path='/Booking/edit/:id' element={<EditBooking />} />
      <Route path='/Booking/get/:id' element={<ReadOneBooking />} />






      <Route path='/Employee' element={<ShowEmployee />} />
      <Route path='/Employee/create' element={<CreateEmployee />} />
      <Route path='/Employee/edit/:id' element={<EditEmployee />} />
      <Route path='/Employee/delete/:id' element={<DeleteEmployee />} />
      <Route path='/Employee/:id' element={<ReadOneEmployee />} />

      <Route path='/EmployeeSalary' element={<ShowEmployeeSalary />} />
      <Route path='/EmployeeSalary/create' element={<CreateEmployeeSalary />} />
      <Route path='/EmployeeSalary/edit/:id' element={<EditEmployeeSalary />} />
      <Route path='/EmployeeSalary/delete/:id' element={<DeleteEmployeeSalary />} />

      <Route path='/Store' element={<ShowStore />} />
      <Route path='/Store/create' element={<CreateStore />} />
      <Route path='/Store/edit/:id' element={<EditStore />} />
      <Route path='/Store/delete/:id' element={<DeleteStore />} />
      <Route path='/Store/:id' element={<ReadOneStore />} />


      <Route path='/Repair' element={<ShowRepair />} />
      <Route path='/Repair/create' element={<CreateRepair />} />
      <Route path='/Repair/edit/:id' element={<EditRepair />} />
      <Route path='/Repair/delete/:id' element={<DeleteRepair />} />
      <Route path='/Repair/:id' element={<ReadOneRepair />} />

      <Route path='/Inquire' element={<ShowInquire />} />
      <Route path='/Inquire/create' element={<CreateInquire />} />
      <Route path='/Inquire/edit/:id' element={<EditInquire />} />
      <Route path='/Inquire/delete/:id' element={<DeleteInquire />} />
      <Route path='/Inquire/:id' element={<ReadOneInquire />} />

    </Routes>
  );

}

export default App;