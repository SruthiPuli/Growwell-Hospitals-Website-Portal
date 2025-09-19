import '../App.css';
import '../index.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './Global_context_variables';

export default function UserProfilePage() {

    const {current_user, SetCurrentPage} = useContext(UserContext);
    const [email_id, SetEmailID] = useState('');
    
    useEffect(() => {

        SetCurrentPage('user_profile');
        const FetchUserDetails = async() => {
            const url = `/api/fetch_user_details/?current_user=${current_user}`;

            try{
                const response = await fetch(url, {
                    method : 'GET',
                    headers : {
                        'Content-Type' : 'application/json',
                    },
                });

                const data = await response.json();

                if(response.ok){
                    SetEmailID(data.email_id);
                    console.log('Success in fetching the user details');

                }

                else{
                    console.log('Failed in fetching the user details');
                }
            }

            catch(error){
                console.log('Getting error in fetching the user details', error);
            }
        }

        FetchUserDetails();
    });

    return(
        <div className='main-container'>
            <div className='profile-page-container'>

                <div className="page-headings">
                <div>
                <i className="fa-solid fa-user inner-icons"></i>
                </div>
                <div>Welcome <span style={{color : '#0289ae'}}>{current_user} ... !</span></div>
                
            
            <div className="instruction-messages">
                Your Profile information of Growwell Hospitals website.
                </div>
                </div>
                <div className='profile-page-inner-container'>
                <div className='inner-profile-page-container'>
                    <div>
                    <div><i className="fa-solid fa-circle-user register-icons"></i></div>
                    <div>Username</div>
                    </div>
                    <div className='profile-content'>{current_user}</div>
                </div>

                <div className='inner-profile-page-container'>
                    <div>
                    <div><i className="fa-solid fa-envelope register-icons"></i></div>
                    <div>Email Address</div>
                    </div>
                    <div className='profile-content'>{email_id}</div>
                </div>
                </div>
            </div>
        </div>
    );
}