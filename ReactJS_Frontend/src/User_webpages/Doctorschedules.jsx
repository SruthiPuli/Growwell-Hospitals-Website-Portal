
import '../App.css'
import '../index.css'

import {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './Global_context_variables';

import {showAlertMessage} from './SweetAlerts';

import doctor1 from '../assets/doctor_images/doctor1.png';
import doctor2 from '../assets/doctor_images/doctor2.png';
import doctor3 from '../assets/doctor_images/doctor3.png';
import doctor4 from '../assets/doctor_images/doctor4.png';
import doctor5 from '../assets/doctor_images/doctor5.png';
import doctor6 from '../assets/doctor_images/doctor6.png';
import doctor7 from '../assets/doctor_images/doctor7.png';
import doctor8 from '../assets/doctor_images/doctor8.png';
import doctor9 from '../assets/doctor_images/doctor9.png';
import doctor10 from '../assets/doctor_images/doctor10.png';
import doctor11 from '../assets/doctor_images/doctor11.png';
import doctor12 from '../assets/doctor_images/doctor12.png';
import doctor13 from '../assets/doctor_images/doctor13.png';
import doctor14 from '../assets/doctor_images/doctor14.png';
import doctor15 from '../assets/doctor_images/doctor15.png';

export default function DoctorSchedules(){

    const location = useLocation();
    const navigate = useNavigate();
    const doctor = location.state || {};

    const {current_doctor, current_user,SetCurrentPage} = useContext(UserContext);
    
    const [doctors_schedules_info, GetDoctorsSchedules] = useState({ dates: [],timeslots: []});
    const [loading, setLoading] = useState(true);

    const [current_date_index, SetCurrentDateIndex] = useState(0);
    const [current_timeslot, SetCurrentTimeSlot] = useState(null);
    const [current_timeslot_value, SetCurrentTimeSlotValue] = useState('');
    const [date_selected , SetDateSelected] = useState(0);
    

    useEffect(() => {

        SetCurrentPage('doctorschedules');

        if (current_doctor === null) return;


        const DoctorSchedules = async () => {
            const url = `/api/fetch_doctors_schedules/?doctor_index=${current_doctor}`;

            try{
                const response = await fetch(url,{ 
                    method : 'GET',
                    headers : {
                        'Content-Type' : 'application/json',
                    },
            });

                const data = await response.json();

                let dates = data.dates;
                let timeslots = data.timeslots;

                GetDoctorsSchedules({dates: data.dates,timeslots: data.timeslots});

                setTimeout(() => {
                    setLoading(false);
                }, 1000);
                

                console.log('Success in fetching the doctors schedules the data');
            }

            catch(error){
                console.error('Getting error in fetching the data');
            }

        }

        DoctorSchedules();

    }, [current_doctor]);

    const doctor_images = [
            doctor1, doctor2, doctor3, doctor4, doctor5,
            doctor6, doctor7, doctor8, doctor9, doctor10,
            doctor11, doctor12, doctor13, doctor14, doctor15
            ];

    return(
        <div className='main-container'>
        {loading ? (
            <div className="loader-container">
            <i className="fa-regular fa-snowflake icon-loader"></i>
            <div className="loader-text">Please wait while loading...</div>
            </div>
        ) : (

            
            <div className='main-container'>

                <div className='main-schedules-container'>   
                <div className='doctor-schedules-container'>
                    <div className='doctor-details-container'>

                        <div className='doctor-image'>
                            <img src={doctor_images[current_doctor]} alt="" className='doctor-schedules-image' />
                        </div>

                        <div className='doctor-details'>
                            <div>{doctor.doctor_name}</div>
                            
                            <div><i className="fa-solid fa-gem doctor-diamond"></i> &nbsp;{doctor.specialization}</div>
                            <div><i className="fa-solid fa-graduation-cap doctor-hat"></i> &nbsp;&nbsp;{doctor.degree}</div>
                            <div>&nbsp;<i className="fa-solid fa-circle-check doctor-check"></i>&nbsp;&nbsp;&nbsp;&nbsp;{doctor.experience} years of experience</div>
                            <div>&nbsp;<i className="fa-solid fa-credit-card doctor-check"></i>&nbsp;&nbsp;&nbsp;Consultation Fee : Rs.{doctor.consultation_fee}</div>
                        </div>

                    </div>

                    <div className='schedules-container'>
                        <div className='dates-container'>   

                            {doctors_schedules_info.dates.map((date, index) => (
                                <div className='dates-inner-container' key={index}>
                                <div>
                                    <button className='inside-schedule-buttons' key = {index} style={{background : date_selected === index ? '#0289ae' : 'white', color : date_selected === index ? 'white' : 'black',}}
                                    onClick={() => {SetDateSelected(index); SetCurrentDateIndex(index); SetCurrentTimeSlotValue(''); SetCurrentTimeSlot(null); }}>
                                        <i className="fa-solid fa-calendar timeslot-icon"></i>&nbsp;&nbsp;{date}</button>
                                </div>

                                <div className='slots-count-container'>
                                    {doctors_schedules_info.timeslots[index] &&
                                    doctors_schedules_info.timeslots[index] .filter(timeslot => timeslot[1]).length} slots are available
                                </div>
                                </div>
                            ))}


                        </div>

                        <div className='timeslots-container'>

                            {doctors_schedules_info.timeslots[current_date_index] &&
                        (() => {
                        const slots = doctors_schedules_info.timeslots[current_date_index];
                        const day_timings = ['Morning', 'Afternoon', 'Evening'];
                        const chunks = [
                            slots.slice(0, 6),   
                            slots.slice(6, 12),  
                            slots.slice(12),     
                        ];

                        return chunks.map((chunk, chunkIndex) => (
                            <div className='timeslots-group-container' key={chunkIndex}>

                                <div className='day-timings'>{day_timings[chunkIndex]}</div>
                                <div className='timeslots-group'>
                                {chunk.filter(timeslot => timeslot[1])
                                .map((timeslot, index) => (
                                    
                                    <button
                                    className='timeslot-buttons'
                                    disabled={!timeslot[1]}
                                    key={index}
                                    onClick={() => {
                                        
                                        SetCurrentTimeSlot(index + chunkIndex * 6); 
                                        SetCurrentTimeSlotValue('at ' + timeslot[0]);
                                    }}
                                    ><i className="fa-solid fa-clock timeslot-icon"></i>&nbsp; &nbsp;
                                    {timeslot[0]}
                                    </button>
                                ))}

                                </div>

                                <div className='slots-count-container-down'>
                                    {chunk.filter(timeslot => timeslot[1]).length} slots are available
                                </div>

                                
                            </div>
                        ));
                        })()}
                        </div>

                        <div>
                    <button className='book-appointment-button'
                    onClick = {() => {
                        if(current_user === null){
                            showAlertMessage('Please Login to Book the appointment');
                        }
                        else if(current_timeslot === null){
                            showAlertMessage('Please Select a timeslot before booking the appointment');
                        }
                        else {
                            
                            navigate('/patients_info', {state : {
                                'date_index' : current_date_index, 
                                'timeslot_index' : current_timeslot,
                            }});
                        window.scrollTo({ top: 0 });}}}
                    > Book Appointment {current_timeslot_value}&nbsp; &nbsp;<i className="fa-solid fa-circle-right timeslot-icon"></i></button>
                </div>
                        

                    </div>

                </div>
            </div>
            </div>

            )
        }
    </div>

        
    );
}