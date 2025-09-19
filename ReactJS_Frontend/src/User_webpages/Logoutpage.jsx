import '../App.css';
import '../index.css';

import { useContext, useEffect } from 'react'; 
import { UserContext } from './Global_context_variables';
import { useNavigate } from 'react-router-dom';
import {showAlertLoginRegisterSuccessful} from './SweetAlerts';

export default function LogoutPage() {

    const {current_user, SetCurrentUser, SetCurrentPage} = useContext(UserContext);
    
    const navigate = useNavigate();

    useEffect(() => {
        SetCurrentPage('logout');
    });

    return (
        <div className='log-out-container'>

          <div className="page-headings">
                <div>
                <i className="fa-solid fa-user inner-icons"></i>
                </div>
                <div>Want to Logout <span style={{color : '#0289ae'}}>{current_user} ... ?</span></div>
                
            
            <div className="instruction-messages">
                Logout from the Growwell Hospitals website.
                </div>
                </div>
            <div className='inner-logout-container'>
                
                <div>
                    <h3><i className="fa-solid fa-power-off"></i>&nbsp;Do you want to Logout?</h3>
                </div>

                <div className='logout-buttons'>
                    <button
                    onClick = {() => {SetCurrentUser(null); showAlertLoginRegisterSuccessful(current_user + ' Logged out Successfully ');SetCurrentPage('home');navigate('/homepage');}}
                    >Yes,  Logout<i className="fa-solid fa-circle-arrow-right"></i></button>
                    <button
                    onClick = {() => {SetCurrentPage('home');navigate('/homepage');}}
                    >No,  Stay Login<i className="fa-solid fa-circle-arrow-left"></i></button>
                </div>
            </div>
        </div>
    );
}