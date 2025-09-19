import './App.css'
import './index.css';

import { UserContext } from './User_webpages/Global_context_variables';

import {useNavigate} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';
import HomePage from './User_webpages/Homepage';
import RegisterPage from './User_webpages/Registerpage';
import LoginPage from './User_webpages/Loginpage';
import DoctorsPage from './User_webpages/Doctorspage';
import DoctorSchedules from './User_webpages/Doctorschedules';
import PatientsInfo from './User_webpages/Patientsinfo';
import DiagnosticCenter from './User_webpages/Diagnosiscenter';
import DiagnosisSubtests from './User_webpages/Diagnosis_subtests';
import LogoutPage from './User_webpages/Logoutpage';
import UserAppointmentsPage from './User_webpages/UserAppointments';
import UserVisitsPage from './User_webpages/UserVisits';
import UserProfilePage from './User_webpages/Userprofile';

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';


function App() {

    const navigate = useNavigate(); 

    useEffect(()=>{
        
        navigate('/homepage');
    }, []);

    const {current_user, SetCurrentUser, current_page, selected , SetSelected} = useContext(UserContext);

    return (
        
        <div className='main-container'>

            <div className='navigation-bar'>

                <div>

                <div className='hospital-name'><i className="fa-regular fa-snowflake hospital-icon"></i>   Growwell Hospitals</div>

                </div>

                <div>
            {
        <div className='sub-container'>
            <div className = 'left-container'>

                <div className='inner-container'
                onClick={(e)=>{navigate('/homepage');  SetSelected(0); }}  style={{  background: current_page === 'home' ? "#e4f8f8ff" : "",  color: current_page === 'home' ? "#0289ae" : "", }}
                >
                    <div><i className="fa-solid fa-house inner-icons"></i></div>
                    <div>Home</div>
                </div>
                <div className='inner-container'
                    onClick={(e)=>{navigate('/doctors');  SetSelected(1); }}  style={{  background: current_page === 'doctors_page' ? "#e4f8f8ff" : "",  color: current_page === 'doctors_page' ? "#0289ae" : "", }}
                >
                    <div><i className="fa-solid fa-user-nurse inner-icons"></i></div>
                    <div>Doctors</div>
                </div>

                <div className='inner-container'
                    onClick={(e)=>{navigate('/diagnostic_center');  SetSelected(2); }}  style={{  background: current_page === 'diagnostic_center' ? "#e4f8f8ff" : "",  color: current_page === 'diagnostic_center' ? "#0289ae" : "", }}
                >
                    <div><i className="fa-solid fa-microscope inner-icons"></i></div>
                    <div>Diagnostic Center</div>
                </div>

                { current_user !== null &&

                <div className='inner-container'
                onClick={(e) => {navigate('/user_appointments');  SetSelected(3); }}  style={{  background: current_page === 'user_appointments' ? "#e4f8f8ff" : "",  color: current_page === 'user_appointments' ? "#0289ae" : "", }}>
                
                
                    <div><i className="fa-solid fa-calendar-check inner-icons"></i></div>
                    <div>Appointments</div>
                </div>

                }

                { current_user !== null &&

                <div className='inner-container'
                onClick={(e)=>{navigate('/user_visits');  SetSelected(4); }}  style={{  background: current_page === 'user_visits' ? "#e4f8f8ff" : "",  color: current_page === 'user_visits' ? "#0289ae" : "", }}
                >
                    <div><i className="fa-solid fa-notes-medical inner-icons"></i></div>
                    <div>Visits</div>
                </div>

                }

                { current_user === null && 

                <div className='inner-container'
                onClick={(e) => {navigate('/login');  SetSelected(5); window.scrollTo({ top: 0 });}}  style={{  background: current_page === 'login' ? "#e4f8f8ff" : "",  color: current_page === 'login' ? "#0289ae" : "", }}>
                
                    <div><i className="fa-solid fa-right-to-bracket inner-icons"></i></div>
                    <div>Login</div>
                </div>

                }

                { current_user === null && 

                <div className='inner-container'
                    onClick={(e) => {navigate('/register');  SetSelected(6); window.scrollTo({ top: 0 });}}  style={{  background: current_page === 'register' ? "#e4f8f8ff" : "",  color: current_page === 'register' ? "#0289ae" : "", }}
                >
                    <div><i className="fa-regular fa-id-card inner-icons"></i></div>
                    <div>Register</div>
                </div>

                }

                { current_user !== null && 

                <div className='inner-container'
                    onClick={(e) => {navigate('/user_profile');  SetSelected(7); }}  style={{  background: current_page === 'user_profile' ? "#e4f8f8ff" : "",  color: current_page === 'user_profile' ? "#0289ae" : "", }}
                >
                    <div><i className="fa-solid fa-user inner-icons"></i></div>
                    <div>Profile</div>
                </div>

                }

                { current_user !== null && 

                <div className='inner-container'
                    onClick={(e) => {navigate('/logout');  SetSelected(8); }}  style={{  background: current_page === 'logout' ? "#e4f8f8ff" : "",  color: current_page === 'logout' ? "#0289ae" : "", }}
                >
                    <div><i className="fa-solid fa-right-from-bracket inner-icons"></i></div>
                    <div>Logout</div>
                </div>

                }


            </div>
        </div>
}
        </div>
        </div>
        

        <div>
    
        <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path='/homepage' element={<HomePage/>}/>
            <Route path='/register' element={<RegisterPage/>} />
            <Route path='/login' element = {<LoginPage/>}/>
            <Route path='/doctors' element = {<DoctorsPage/>}/>
            <Route path='/doctorschedules' element = {<DoctorSchedules/>}/>
            <Route path='/patients_info' element = {<PatientsInfo/>}/>
            <Route path='/diagnostic_center' element = {<DiagnosticCenter/>}/>
            <Route path='/diagnosis_subtests' element = {<DiagnosisSubtests/>}/>
            <Route path='/logout' element = {<LogoutPage/>}/>
            <Route path='/user_appointments' element = {<UserAppointmentsPage/>}/>
            <Route path='/user_visits' element = {<UserVisitsPage/>}/>
            <Route path='/user_profile' element = {<UserProfilePage/>}/>
        </Routes>
</div>
</div>

    );
}

export default App
