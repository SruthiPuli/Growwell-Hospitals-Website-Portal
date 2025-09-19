import { useState , useEffect, useContext} from 'react'
import '../App.css';
import '../index.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";    
import "@fortawesome/fontawesome-free/css/regular.min.css";  
import "@fortawesome/fontawesome-free/css/brands.min.css";  


import {Form} from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import { UserContext } from './Global_context_variables';

import {showAlertLoginRegisterSuccessful} from './SweetAlerts';



export default function RegisterPage() {

    useEffect(() => {
        SetCurrentPage('register');
    }, []);

    const navigate = useNavigate();
    const [activeindex, SetActiveIndex] = useState(0);
    const [form_data, SetFormData] = useState({
    username: '',
    email_id: '',
    password: '',
    email_code : '',
});

    const {SetCurrentPage, selected, SetSelected} = useContext(UserContext);
    

    const [showmessage, SetShowMessage] = useState('');
    const [valid_email, SetValidEmail] = useState(false);
    const [email_verification_code, SetEmailVerificationCode] = useState(null);
    const [valid_email_code, SetValidEmailCode] = useState(false);
    const [mail_code_message, ShowMailCodeMessage] = useState('');
    const [length, SetLength] = useState(false);
    const [capital_letter, SetCapitalLetter] = useState(false);
    const [number, SetNumber] = useState(false);
    const [email_otp, SetEmailOTP] = useState(false);
    const [valid_password, SetValidPassword] = useState(false);
    const [username_exists, SetUserNameExists] = useState(false);
    const [loading, setLoading] = useState(true);
    const [password_icon_clicked, SetPasswordIconClicked] = useState(false);


    
    function handleActiveIndex(step){

        if(step === 50){
            SetActiveIndex(step);
            navigate('/homepage');
        }


        SetActiveIndex(step);
    }

    function handleInputChange(e){

        const {name, value} = e.target;
        SetFormData({...form_data, [name] : value});
    }

    const CheckUserNameExists = async() => {

        const username = form_data.username;

        const url = `/api/check_user_name_exists/?username=${username}`;

        try{
            const response = await fetch(url, {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                },
            });

            const data = await response.json();

            if(!data.exists) {
                SetUserNameExists(false);
                handleActiveIndex(1);
                SetShowMessage('');
                console.log('Username is not present');
                return false;
            }

            else{
                SetUserNameExists(true);
                SetShowMessage('Username Already Exists. Please Provide another one');
                console.log('Failed in checking the username');
                return true;
            }
        }

        catch(error){
            console.log('Getting error in checking the username', error);
        }
    }

    const CheckValidEmail = () => {

        const email_id = form_data.email_id;

        if(!email_id){
            SetShowMessage('Email is required');
            return false;
        }

        if(!email_id.endsWith('@gmail.com')){
            SetShowMessage('Please provide a valid email id');
            
            return false; 
   
        }

        else{

            SetEmailOTP(true);
            
            const email_exists = async () => {
    
            let url = `/api/validate_email/?email_id=${email_id}`;

            try{
                const response = await fetch(url, {
                    method : 'GET',
                    headers : {
                        'Content-Type' : 'application/json',
                    }
                });

                const data = await response.json();

                // SetEmailVerificationCode(data.email_verification_code);

                if(data.status == 'Success') {
                    SetShowMessage('');
                    SetValidEmail(true);
                    SetEmailOTP(true);
                    console.log('success in sending the mail');
                    setLoading(false);
                    handleActiveIndex(2);
                }
                else{
                    SetShowMessage(data.message);
                    console.log('Failed to send the mail id')
                }

            }

            catch(error){
                console.error("Getting error in fetching the email id");
            }
        };

        email_exists();
            return true;
        }

    }

    const ValidateMailVerificationCode = () => {

        if(form_data.email_code == email_verification_code){
            SetValidEmailCode(true);
            handleActiveIndex(2);
        }
        else {
            ShowMailCodeMessage('Invalid OTP. Please enter a valid one');
        }
    }

    const CheckValidPassword = (password) => {


        SetLength(password.length >= 8);
        SetCapitalLetter(/[A-Z]/.test(password));

        SetNumber(/[0-9]/.test(password)); 

        if(length && capital_letter && number){
            SetValidPassword(true);
            return true;
        }
        else{
            SetValidPassword(false);
            SetShowMessage('Password should follow below conditions');
            return false;
        }

    }

    const StoreUserData = async () => {


        let url = '/api/register_user/';

        try{

            const response = await fetch(url, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({'username' : form_data.username, 'email_id' : form_data.email_id, 'password' : form_data.password}),
            });

            if(response.status === 200){
                showAlertLoginRegisterSuccessful(form_data.username + ' Registered Successfully. Please Login');
                navigate('/homepage');
            }
            else{
                console.error("Failed to store the data");
            }
        }

        catch(error){
            console.error("Getting error to register the user");
        }
    }


   
    const StepForms = [
         <div>
            

            <div className='inner-div-register'>

                <button className='back-button'
                onClick={()=>{handleActiveIndex(50);  SetSelected(0);}}
                ><i className="fa-solid fa-circle-arrow-left left-arrow-circle-icon"></i> &nbsp;Go Home</button>
                <p>Hospital registration</p>

            </div>
            <div className='inner-div-register'>
                <h3>Enter your Username</h3>
                <p>We require this to verify your identity. Your details will remain safe.</p>
            </div>

            <div className='inner-div-register'>

                <Form.Label>Username</Form.Label>
                <Form.Control className = 'inputs' type = 'text' name = 'username' value = {form_data.username} onChange = {handleInputChange}/>

                {(form_data.username === '' || username_exists)&& <div className='error-messages'>{showmessage}</div>}
            </div>

            <div className='inner-div-register'>
                <button className = 'continue-button'
                    onClick={() => {
                        if(form_data.username === ''){
                            SetShowMessage('Username field is required');
                        }
                        else{
                            CheckUserNameExists();
                            window.scrollTo({ top: 0 });
                        }
                    }}
                >
                    Continue &nbsp;<i className="fa-solid fa-circle-arrow-right right-arrow-circle-icon"></i></button>
            </div>

        </div>, 

         <div>
            

            <div className='inner-div-register'>

                <button className='back-button'
                onClick={()=>{handleActiveIndex(0);}}
                ><i className="fa-solid fa-circle-arrow-left left-arrow-circle-icon"></i> &nbsp; Go Back</button>
                <p>Hospital registration</p>

            </div>
            <div className='inner-div-register'>
                <h3>Enter your Email Address</h3>
                <p>We require this to verify your identity. Your details will remain safe.</p>
            </div>

            <div className='inner-div-register'>

                <Form.Label>Email Address</Form.Label>
                <Form.Control className = 'inputs' type = 'email' name = 'email_id' value = {form_data.email_id} onChange = {handleInputChange}/>

                {(form_data.email_id === '' && valid_email ) || <div className='error-messages'>{showmessage}</div>}
            </div>

            <div className='inner-div-register'>
                        <button className = 'continue-button'
                            onClick={() => {
                                if(showmessage === 'Email already exists, Provide a new one'){
                                    SetShowMessage('');
                                    }
                                CheckValidEmail(); window.scrollTo({ top: 0 });}}
                        >
                            Continue &nbsp;<i className="fa-solid fa-circle-arrow-right right-arrow-circle-icon"></i></button>
                    </div>

            {/* <div className='inner-div-register'>
                <button className = 'continue-button'
                    onClick={() => {
                        if(showmessage === 'Email already exists, Provide a new one'){
                            SetShowMessage('');
                        }
                        CheckValidEmail(); setLoading(true);}}
                >
                    Send OTP &nbsp;<i className="fa-solid fa-circle-arrow-right right-arrow-circle-icon"></i></button>
            </div> */}


            {/* {email_otp && showmessage === '' &&
            
                (loading? 
                    
                    (<div className="inner-div-register">
                        <i className="fa-regular fa-snowflake icon-loader"></i>
                        <div className="loader-text">Please wait. We are sending the OTP to the above Email Address.</div>
                        </div>) : (
                        <div className='inner-div-register'>

                        <Form.Label>Enter OTP</Form.Label>
                        <Form.Control className = 'inputs' type = 'text' name = 'email_code' value = {form_data.email_code} onChange = {handleInputChange}/>

                        {(form_data.email_code === '' && valid_email_code ) || <div className='error-messages'>{mail_code_message}</div>}
                        
                        <div className='inner-div-register'>
                        <button className = 'continue-button'
                            onClick={() => {ValidateMailVerificationCode(); window.scrollTo({ top: 0 });}}
                        >
                            Continue &nbsp;<i className="fa-solid fa-circle-arrow-right right-arrow-circle-icon"></i></button>
                    </div>
                    
                    </div>
                ))
            } */}

        </div>, 

         <div>
            

            <div className='inner-div-register'>

                <button className='back-button'
                onClick={()=>{handleActiveIndex(1);}}
                ><i className="fa-solid fa-circle-arrow-left left-arrow-circle-icon"></i> &nbsp; Go Back</button>
                <p>Hospital registration</p>

            </div>
            <div className='inner-div-register'>
                <h3>Enter your Password</h3>
                <p>We require this to verify your identity. Your details will remain safe.</p>
            </div>

            <div className='inner-div-register'>

                <Form.Label>Password</Form.Label>
                <div className='password-input'>
                    <div>       
                <Form.Control className = 'inputs' type = {password_icon_clicked ? 'text' : 'password'} name = 'password' value = {form_data.password} 
                 onChange = {(e) => {
                    handleInputChange(e);
                    CheckValidPassword(e.target.value);
                }}
                
                />
                </div>

                     {!password_icon_clicked && 
                    <div onClick = {() => {SetPasswordIconClicked(true);}}><i class="fa-solid fa-eye password-icon"></i></div>}

                    {password_icon_clicked && 
                    <div onClick = {() => {SetPasswordIconClicked(false);}}><i class="fa-solid fa-eye-slash password-icon"></i></div>}

                </div>

                {form_data.password === '' && valid_password  && <div className='error-messages'>{showmessage}</div>}
            </div>

            <div className='inner-div-register'>

                <p className='password-messages' style = {{color : capital_letter ? '#0289ae' : 'black', padding : 0, margin : '0px 5vh',}}><i className="fa-solid fa-circle-check register-icons"></i>&nbsp;&nbsp;&nbsp; Password should have atleast one capital letter</p>
                <p className='password-messages' style = {{color : number ? '#0289ae' : 'black', padding : 0, margin : '0px 5vh',}}><i className="fa-solid fa-circle-check register-icons"></i>&nbsp;&nbsp;&nbsp; Password must contain atleast one digit</p>
                <p className='password-messages' style = {{color : length ? '#0289ae' : 'black', padding : 0, margin : '0px 5vh',}}><i className="fa-solid fa-circle-check register-icons"></i>&nbsp;&nbsp;&nbsp; Password must have atleast 8 characters</p>

            </div>

            <div className='inner-div-register'>
                <button className = 'continue-button'
                    onClick={() => {
                        if(CheckValidPassword(form_data.password)){
                            StoreUserData();
                        }
                        else{
                            SetShowMessage('Password should follow below conditions');
                        }
                    }}
                >
                    Continue &nbsp;<i className="fa-solid fa-circle-arrow-right right-arrow-circle-icon"></i></button>
            </div>

        </div>
    ]

  return(

    <div className='main-register-container'>

        <div className='left-register-container'>

            <div className='register-left'
            onClick={()=>{handleActiveIndex(0);}}
            style={{ color: activeindex >= 0 ? 'black' : 'grey'}}
            >
                <div><i className="fa-solid fa-circle-user register-icons"></i></div>
                <div><button>Username</button></div>
            </div>

            <div className='register-left'
                onClick={()=>{
                    if(form_data.username !== ''){
                        handleActiveIndex(1);}}
                    }
                style={{ color: activeindex >= 1 ? 'black' : 'grey'}}


            >
                <div><i className="fa-solid fa-envelope register-icons"></i></div>
                <div><button>Email</button></div>
            </div>

            <div className='register-left'
                onClick={()=>{
                    if(form_data.email_id !== ''){
                        handleActiveIndex(2);}}
                    }
                style={{ color: activeindex >= 2 ? 'black' : 'grey'}}
            >
                <div><i className="fa-solid fa-lock register-icons"></i></div>
                <div><button>Password</button></div>
            </div>

        </div>

        <div  className='right-register-container'>{StepForms[activeindex]}</div>
       
    </div>
  );
}
