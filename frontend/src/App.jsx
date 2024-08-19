import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ShowAllVacancy from './assets/pages/Vacancy/ShowAllVacancy';
import CreateVacancy from './assets/pages/Vacancy/CreateVacancy';
import ReadOneVacancy from './assets/pages/Vacancy/ReadOneVacancy';
import EditVacancy from './assets/pages/Vacancy/EditVacancy';
import DeleteVacancy from './assets/pages/Vacancy/DeleteVacancy';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<ShowAllVacancy />} />
      <Route path='/vacancy/create' element={<CreateVacancy />} />
      <Route path='/vacancy/details/:id' element={<ReadOneVacancy />} />
      <Route path='/vacancy/edit/:id' element={<EditVacancy />} />
      <Route path='/vacancy/delete/:id' element={<DeleteVacancy />} />

    </Routes>
  )
}

export default App