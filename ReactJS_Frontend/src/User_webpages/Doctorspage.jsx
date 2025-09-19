import { useState } from 'react'
import '../App.css'
import '../index.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './Global_context_variables';

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



export default function DoctorsPage() {

  const {current_user, SetCurrentDoctor, SetCurrentPage} = useContext(UserContext);
  

    const navigate = useNavigate();

    const [Doctors_info, SetDoctorsInfo] = useState([]);

  const url = '/api/fetch_doctors_info/';

    useEffect(() => {
        SetCurrentPage('doctors_page');
        const FetchDoctorsInfo = async () => {

        const response = await fetch(url, {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                },

            });

        const data = await response.json();

        if(response.ok){
            SetDoctorsInfo(data.doctors_info);
            console.log('Success in fetching the doctors data');
        }
        else{
            console.log('Error in fetching the doctors data');
        }
    }

        FetchDoctorsInfo();

        
    },[]);

     const doctor_images = [
        doctor1, doctor2, doctor3, doctor4, doctor5,
        doctor6, doctor7, doctor8, doctor9, doctor10,
        doctor11, doctor12, doctor13, doctor14, doctor15
        ];

  return(

    <div className='main-container'>

        <div className='doctors-middle-container'>
            
            <div className = 'doctors-page'>

                <div className='page-headings'>
                    <div><i className="fa-solid fa-user-nurse inner-icons inner-icons"></i></div>
                    <div>Visit Our Doctors</div>
                    
                    <div className="instruction-messages">
                        Find the best Doctors to cure and help.
                    </div>
                </div>
            {Doctors_info && 
            Doctors_info.map((doctor, index) => (
                <div key = {index} className = 'doctors-row' > 

                <div className='doctors-image'><img src={doctor_images[index]} className='doctor-inside-image' alt="" /></div>
                <div className='doctors-info'>
                    <div>{doctor[0]}</div>
                    
                    <div><i className="fa-solid fa-gem doctor-diamond"></i>&nbsp;&nbsp;{doctor[2]}</div>
                    <div><i className="fa-solid fa-graduation-cap doctor-hat"></i>&nbsp;&nbsp;&nbsp;{doctor[3]}</div>
                    <div>&nbsp;<i className="fa-solid fa-circle-check doctor-check"></i>&nbsp;&nbsp;&nbsp;  {doctor[1]} years of experience</div>
                    <div>&nbsp;<i className="fa-solid fa-credit-card doctor-check"></i>&nbsp;&nbsp;&nbsp;Consultation Fee : <span>Rs. {doctor[4]}</span></div>
                    
                

                <div className='doctors-button'><button
                    onClick={() => {
                        SetCurrentDoctor(index);
                        navigate('/doctorschedules', 
                            {state : {
                                'doctor_index' : index, 
                                'doctor_name' : doctor[0],
                                'experience' : doctor[1],
                                'specialization' : doctor[2],
                                'degree' : doctor[3],
                                'consultation_fee' : doctor[4],
                            
                            }});}}
                >Visit this Doctor <i className="fa-solid fa-arrow-right"></i> </button></div>
                    </div>
                
                </div>
            ))}
            </div>



        </div>

    </div>
  );
}

