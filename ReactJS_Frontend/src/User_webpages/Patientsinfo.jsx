import '../App.css'
import '../index.css'

import {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './Global_context_variables';
import {Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {showAlertLoginRegisterSuccessful} from './SweetAlerts';



export default function PatientsInfo(){
    const location = useLocation();
    const navigate = useNavigate();
    const timings = location.state || {};
    const [activeIndex, SetActiveIndex] = useState(0);
    const [showmessage, SetShowMessage] = useState('');
    const [valid_mobile_no, SetValidMobileNo] = useState(false);
    const {current_user, current_doctor, SetCurrentDoctor, SetCurrentPage} = useContext(UserContext);
    const [gender_selected, SetGenderSelected] = useState(0);
    const [loading, SetLoading] = useState(false);
    
    const [patient_data, SetPatientData] = useState({
            patient_name: '',
            gender: '',
            dateofbirth: '',
            mobileno : '',
        });

    useEffect(() => {
        SetCurrentPage('patients_info');
    });

    function handleActiveIndex(step){

        if(step === 50){
            SetActiveIndex(step);
            navigate('/homepage');
        }


        SetActiveIndex(step);
    }

    function handleInputChange(e){

        const {name, value} = e.target;
        SetPatientData({...patient_data, [name] : value});
    }

    const BookAppointment = async() =>  {

            const current_date = timings.date_index;
            const current_timeslot = timings.timeslot_index;

            const url = '/api/book_appointment/';
            try{
                const response = await fetch(url, {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json',
                    },
                    body : JSON.stringify({
                        user : current_user,
                        current_doctor : current_doctor,
                        date : current_date,
                        timeslot : current_timeslot,
                        payment_mode : 'offline', 

                        patients_info : {
                            'fullname' : patient_data.patient_name,
                            'gender' : patient_data.gender,
                            'dateofbirth' : patient_data.dateofbirth,
                            'mobileno' : patient_data.mobileno,
                        },
                    }),
                });

                const data = await response.json();

                if(response.ok){

                    let message = data.message 
                    SetLoading(false);
                    showAlertLoginRegisterSuccessful(' Appointment booked Successfully for ' + patient_data.patient_name)

                    navigate('/doctors');
                
                    console.log(message);

                    SetCurrentDoctor(null);
                }

            }

                catch(error){
                    console.log("Getting error", error);
                }
            }

          


    
    const StepForms = [
        <div className='right-patient-register-container'>
        <div className='inner-div-register'>

                <button className='back-button'
                onClick={()=>{handleActiveIndex(50);}}
                ><i className="fa-solid fa-circle-arrow-left left-arrow-circle-icon"></i> &nbsp; Go Back</button>
                <p>Patient Details</p>

            </div>
            <div className='inner-div-register'>
                <p>We require this to verify patient's identity. Your details will remain safe.</p>
            </div>

            <div className='inner-div-register'>
                <Form.Label>Patient Fullname</Form.Label>
                <Form.Control className = 'inputs' type = 'text' name = 'patient_name' value = {patient_data.patient_name} onChange = {handleInputChange}/>
                {(patient_data.patient_name === '' ) && <div className='error-messages'>{showmessage}</div>}
                  </div>

            <div>
                <button
                onClick={() => {
                    if(patient_data.patient_name === ''){
                        SetShowMessage('Patient name is required');
                    }
                    else{
                        SetShowMessage('');
                        handleActiveIndex(1);
                    }
                }}>Continue&nbsp;&nbsp;<i className="fa-solid fa-circle-arrow-right right-arrow-circle-icon"></i></button>
            </div>
            </div>,

            <div className='right-patient-register-container'>
        <div className='inner-div-register'>

                <button className='back-button'
                onClick={()=>{handleActiveIndex(0);}}
                ><i className="fa-solid fa-circle-arrow-left left-arrow-circle-icon"></i> &nbsp; Go Back</button>
                <p>Patient Details</p>

            </div>
            <div className='inner-div-register'>
                <p>We require this to verify patient's identity. Your details will remain safe.</p>
            </div>

            <div className='inner-div-register'>
                <Form.Label>Patient Gender</Form.Label>
                <div className='radio-options'>
                <label><button style={{background : gender_selected == 1 ? '#0289ae' : 'white', color : gender_selected == 1 ? 'white' : 'black',}} onClick={() => {patient_data.gender='Male'; SetGenderSelected(1);}}><i className="fa-solid fa-mars"></i>Male</button></label>
                <label><button style={{background : gender_selected == 2 ? '#0289ae' : 'white', color : gender_selected == 2 ? 'white' : 'black',}} onClick={() => {patient_data.gender='Female'; SetGenderSelected(2);}}><i className="fa-solid fa-venus"></i>Female</button></label>
                <label><button style={{background : gender_selected == 3 ? '#0289ae' : 'white', color : gender_selected == 3 ? 'white' : 'black',}} onClick={() => {patient_data.gender='Others'; SetGenderSelected(3);}}><i className="fa-solid fa-transgender"></i>Others</button></label>
                
                </div>
            {(patient_data.gender === '' ) && <div className='error-messages'>{showmessage}</div>}
                  </div>

            <div>
                <button
                onClick={() => {
                    if(patient_data.gender === ''){
                        SetShowMessage('Please select a gender');
                    }
                    else{
                        SetShowMessage('');
                        handleActiveIndex(2);
                    }
                }}
                >Continue&nbsp;&nbsp;<i className="fa-solid fa-circle-arrow-right right-arrow-circle-icon"></i></button>
            </div>
            </div>,

            <div className='right-patient-register-container'>
        <div className='inner-div-register'>

                <button className='back-button'
                onClick={()=>{handleActiveIndex(1);}}
                ><i className="fa-solid fa-circle-arrow-left left-arrow-circle-icon"></i> &nbsp; Go Back</button>
                <p>Patient Details</p>

            </div>
            <div className='inner-div-register'>
                <p>We require this to verify patient's identity. Your details will remain safe.</p>
            </div>

            <div className='inner-div-register'>
                <Form.Label>Patient Date of Birth</Form.Label>
                <Form.Control className = 'inputs' type = 'date' name = 'dateofbirth' value = {patient_data.dateofbirth} onChange = {handleInputChange}/>
                {(patient_data.dateofbirth === '' ) && <div className='error-messages'>{showmessage}</div>}
                  </div>

            <div>
                <button
                onClick={() => {
                    if(patient_data.dateofbirth === ''){
                        SetShowMessage('Date of Birth is required');
                    }
                    else{
                        SetShowMessage('');
                        handleActiveIndex(3);
                    }
                }}>Continue&nbsp;&nbsp;<i className="fa-solid fa-circle-arrow-right right-arrow-circle-icon"></i></button>
            </div>
            </div>,

            <div className='right-patient-register-container'>
        <div className='inner-div-register'>

                <button className='back-button'
                onClick={()=>{handleActiveIndex(2);}}
                ><i className="fa-solid fa-circle-arrow-left left-arrow-circle-icon"></i> &nbsp; Go Back</button>
                <p>Patient Details</p>

            </div>
            <div className='inner-div-register'>
                <p>We require this to verify patient's identity. Your details will remain safe.</p>
            </div>

            <div className='inner-div-register'>
                <Form.Label>Patient Mobile Number</Form.Label>
                <Form.Control className = 'inputs' type = 'text' name = 'mobileno' value = {patient_data.mobileno} onChange = {(e) => {
                    
                    handleInputChange(e);
                    
                    if(e.target.value === ''){
                        SetValidMobileNo(true);
                        SetShowMessage('Mobile Number is required');
                    }
                    else if(!/^[0-9]*$/.test(e.target.value)){
                        SetValidMobileNo(true);
                        SetShowMessage('Mobile Number only consists of digits');
                    }

                    else if((e.target.value).length !== 10){
                        SetValidMobileNo(true);
                        SetShowMessage('Mobile Number consists of exactly 10 digits');
                    }
                    else{
                        SetValidMobileNo(false);
                        SetShowMessage('');
                    }
                    }}/>
                
                {(patient_data.mobileno === '' || valid_mobile_no) && <div className='error-messages'>{showmessage}</div>}
                  </div>

            <div>
                <button
                onClick={() => {
                    if(patient_data.mobileno === ''){
                        SetShowMessage('Mobile Number is required');
                    }

                    else if(!/^[0-9]*$/.test(patient_data.mobileno)){
                        SetValidMobileNo(true);
                        SetShowMessage('Mobile Number only consists of digits');
                    }

                    else if((patient_data.mobileno).length !== 10){
                        SetValidMobileNo(true);
                        SetShowMessage('Mobile Number consists of exactly 10 digits');
                    }

                    else{
                        SetShowMessage('');
                        handleActiveIndex(4);
                        SetLoading(true);
                        BookAppointment();
                    }
                }}>Continue&nbsp;&nbsp;<i className="fa-solid fa-circle-arrow-right right-arrow-circle-icon"></i></button>
            </div>
            </div>,
    ]
    
    return(



        <div className='main-container'>

            {loading ? (
                <div className="loader-container">
            <i className="fa-regular fa-snowflake icon-loader"></i>
            <div className="loader-text">Please wait. We are completing the Appointment Process. We will Email you the details regarding the Appointment...</div>
            </div>
            ) : (
        
        <div className='main-patient-container'>
            <div className="page-headings">
                <div>
                <i class="fa-solid fa-clipboard-list inner-icons"></i>
                </div>
                <div>Please fill <span style={{color : '#0289ae'}}>Patient Registration Form ... !</span></div>
                
            
            <div className="instruction-messages">
                Patient information is important to continue the appointment.
                </div>
                </div>
        <div className='patients-info-container'>
            
            <div className='check-marks-container'>
                
                <div className='outer-checkmark-container'  style = {{color : activeIndex>0 ? '#005a74ff' : 'black',}}>
                <div className='inner-checkmark-container' >
                    <i className="fa-solid fa-circle-check" ></i>
                    <div className='horizantal-dashed-line' style = {{borderTopColor : activeIndex>0  ?'#005a74ff' : 'black',}}></div>
                    
                </div>
                <div>Patient Name</div>
                </div>

                <div className='outer-checkmark-container' style = {{color : activeIndex>1 ? '#005a74ff' : 'black',}}>
                <div className='inner-checkmark-container'>
                    <i className="fa-solid fa-circle-check"></i>
                    <div className='horizantal-dashed-line' style = {{borderTopColor : activeIndex>1 ?'#005a74ff' : 'black',}}></div>
                    
                </div>
                <div>Gender</div>
                </div>

                <div className='outer-checkmark-container' style = {{color : activeIndex>2 ? '#005a74ff' : 'black',}}>
                <div className='inner-checkmark-container'>
                    <i className="fa-solid fa-circle-check"></i>
                    <div className='horizantal-dashed-line' style = {{borderTopColor : activeIndex>2 ?'#005a74ff' : 'black',}}></div>
                    
                </div>
                <div>Date of Birth</div>
                </div>

                <div className='outer-checkmark-container' style = {{color : activeIndex>3? '#005a74ff' : 'black',}}>
                <div className='inner-checkmark-container'>
                    <i className="fa-solid fa-circle-check"></i>
                    <div className='horizantal-dashed-line' style = {{borderTopColor : activeIndex>3?'#005a74ff' : 'black',}}></div>
                    
                </div>
                <div>Mobile No</div>
                </div>

                <div className='inner-checkmark-container' style =  {{color : activeIndex>=4 ?  '#005a74ff' : 'black',}}>
                    <i className="fa-solid fa-circle-check"></i>
                </div>

            </div>

            
        </div>

            <div className='patient-input-details'>
                {StepForms[activeIndex]}
            </div>
    </div>
    )}
    </div>
    
    );
}