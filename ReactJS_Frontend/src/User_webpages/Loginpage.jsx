import { useState , useEffect} from 'react'
import '../App.css';
import '../index.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";    
import "@fortawesome/fontawesome-free/css/regular.min.css";  
import "@fortawesome/fontawesome-free/css/brands.min.css";   

import { useContext } from 'react';
import { UserContext} from './Global_context_variables';


import {Form} from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import {showAlertLoginRegisterSuccessful} from './SweetAlerts';



export default function LoginPage() {

    
    const {current_user, SetCurrentUser,SetCurrentPage,  current_page, selected,  SetSelected} = useContext(UserContext);
    const [password_icon_clicked, SetPasswordIconClicked] = useState(false);
    
    const navigate = useNavigate();
    const [activeindex, SetActiveIndex] = useState(0);
    const [form_data, SetFormData] = useState({
    username: '',
    password: '',
});


    const [showmessage, SetShowMessage] = useState('');
    const [valid_password, SetValidPassword] = useState(false);

    useEffect(() => {
        SetCurrentPage('login');
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
        SetFormData({...form_data, [name] : value});
    }

    const ValidateUserCredentials = async(e) => {


        const url = '/api/login_user/';

        try{
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'username' : form_data.username, 'password' : form_data.password })
            });

            const data = await response.json();

            if(data.exists){
                console.log('User Logged in Successfully');
                SetCurrentUser(form_data.username);
                SetValidPassword(false);
                showAlertLoginRegisterSuccessful(form_data.username + ' Logged in Successfully');
                navigate('/doctors');
            }

            else{
                SetValidPassword(true);
                SetShowMessage('No User Found');
            }
        }

        catch(error){
            
            console.log('Getting error in fetching the data')
        }

        }

   
    const StepForms = [

         <div>
            

            <div className='inner-div-register'>

                <button className='back-button'
                onClick={()=>{handleActiveIndex(50); SetSelected(0);}}
                ><i className="fa-solid fa-circle-arrow-left left-arrow-circle-icon"></i> &nbsp; Go Home</button>
                <p>Hospital Login</p>

            </div>
            <div className='inner-div-register'>
                <h3>Enter your Username</h3>
                <p>We require this to verify your identity. Your details will remain safe.</p>
            </div>

            <div className='inner-div-register'>

                <Form.Label>Username</Form.Label>
                <Form.Control className = 'inputs' type = 'text' name = 'username' value = {form_data.username} onChange = {handleInputChange}/>

                {(form_data.username === '' ) && <div className='error-messages'>{showmessage}</div>}
            </div>

            <div className='inner-div-register'>
                <button className = 'continue-button'
                    onClick={() => {
                        if(form_data.username !== ''){
                            handleActiveIndex(1);
                            SetShowMessage('');
                            window.scrollTo({ top: 0 });}
                        else{
                            SetShowMessage('Username field is required');
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
                <p>Hospital Login</p>

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
                    }}
                    
                    />
                    </div>
                    {!password_icon_clicked && 
                    <div onClick = {() => {SetPasswordIconClicked(true);}}><i className="fa-solid fa-eye password-icon"></i></div>}

                    {password_icon_clicked && 
                    <div onClick = {() => {SetPasswordIconClicked(false);}}><i className="fa-solid fa-eye-slash password-icon"></i></div>}

                    
                </div>

                {(form_data.password === '' || valid_password )&& <div className='error-messages'>{showmessage}</div>}
            </div>


            <div className='inner-div-register'>
                <button className = 'continue-button'
                    onClick={() => {
                        if((form_data.password) === ''){
                            SetShowMessage('Password field is required');
                        }
                        else{
                            ValidateUserCredentials();
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
                onClick={()=>{
                    if(form_data.username !== ''){
                        handleActiveIndex(0);}}
                    }
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
                <div><i className="fa-solid fa-lock register-icons"></i></div>
                <div><button>Password</button></div>
            </div>

        </div>

        <div  className='right-register-container'>{StepForms[activeindex]}</div>
       
    </div>
  );
}
