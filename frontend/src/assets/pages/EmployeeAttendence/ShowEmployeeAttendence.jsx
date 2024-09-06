import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


function ShowEmployeeAttendence() {
    const [employeesAttendence, setEmployeesAttendence] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const componentRef = useRef();

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8077/EmployeeAttendence')
            .then((response) => {
                setEmployeesAttendence(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleSearch = () => {
        const filteredAttendence = employeesAttendence.filter((attendance) => {
            return (searchName === '' || attendance.employeeName.toLowerCase().includes(searchName.toLowerCase())) &&
                (searchDate === '' || attendance.date.includes(searchDate));
        });
        return filteredAttendence;
    };

    const filteredEmployeesAttendence = handleSearch();
    const employeeNames = [...new Set(employeesAttendence.map((attendance) => attendance.employeeName))];

    const generateReport = () => {
        const doc = new jsPDF();
        doc.text('Employee Attendance Report', 14, 16);

        doc.autoTable({
            startY: 22,
            head: [['No', 'EmpID', 'Employee Name', 'Date', 'InTime', 'OutTime', 'Worked Hours', 'OT Hours']],
            body: filteredEmployeesAttendence.map((attendance, index) => [
                index + 1,
                attendance.EmpID,
                attendance.employeeName,
                attendance.date,
                attendance.InTime,
                attendance.OutTime,
                attendance.WorkingHours,
                attendance.OThours
            ]),
        });

        doc.save('employee-attendance-report.pdf');
    };

    return (
        <div className="flex">
            <div className='flex-1 p-4'>
                <BackButton destination='/employees/allEmployee' />
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl my-8'>Employee Attendance List</h1>
                    <div className="flex justify-center items-center mt-8">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href='/EmployeeAttendence/create'}>
                            Add Employee Attendence
                        </button>
                        <div style={{ marginLeft: '10px' }}></div>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={generateReport}>
                            Generate Report
                        </button>
                        <div style={{ marginLeft: '10px' }}></div>
                        <ReportEmployeesAttendence filteredEmployeesAttendence={filteredEmployeesAttendence} />
                    </div>
                </div>

                <div className='flex justify-between mb-4'>
                    <div className='flex items-center'>
                        <select
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            className='p-2 border border-gray-300 rounded mr-2'>
                            <option value=''>All Employees</option>
                            {employeeNames.map((name, index) => (
                                <option key={index} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <input
                            type='month'
                            value={searchDate}
                            onChange={(e) => setSearchDate(e.target.value)}
                            className='p-2 border border-gray-300 rounded' />
                    </div>
                </div>

                {loading ? (<Spinner />) : (
                    <table className='w-full border-separate border-spacing-2' ref={componentRef}>
                        <thead>
                            <tr>
                                <th className='border border-slate-600 rounded-md'>No</th>
                                <th className='border border-slate-600 rounded-md'>EmpID</th>
                                <th className='border border-slate-600 rounded-md'>Employee Name</th>
                                <th className='border border-slate-600 rounded-md max-md:hidden'>Date</th>
                                <th className='border border-slate-600 rounded-md max-md:hidden'>InTime</th>
                                <th className='border border-slate-600 rounded-md max-md:hidden'>OutTime</th>
                                <th className='border border-slate-600 rounded-md'>Worked hours</th>
                                <th className='border border-slate-600 rounded-md'>OT hours</th>
                                <th className='border border-slate-600 rounded-md'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployeesAttendence.map((EmployeeAttendence, index) => (
                                <tr key={EmployeeAttendence._id} className='h-8'>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {index + 1}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {EmployeeAttendence.EmpID}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                        {EmployeeAttendence.employeeName}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                        {EmployeeAttendence.date}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                        {EmployeeAttendence.InTime}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                        {EmployeeAttendence.OutTime}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {EmployeeAttendence.WorkingHours}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        {EmployeeAttendence.OThours}
                                    </td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        <div className='flex justify-center gap-x-4'>
                                            <Link to={`/EmployeeAttendence/edit/${EmployeeAttendence._id}`}>
                                                <AiOutlineEdit className='text-2xl text-yellow-600' />
                                            </Link>
                                            <Link to={`/EmployeeAttendence/delete/${EmployeeAttendence._id}`}>
                                                <MdOutlineDelete className='text-2xl text-red-600' />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default ShowEmployeeAttendence;
