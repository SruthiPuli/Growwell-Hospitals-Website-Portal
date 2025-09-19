import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import '../index.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";

import { UserContext } from "./Global_context_variables";

export default function HomePage() {

    const {current_user, SetCurrentPage, selected, SetSelected} = useContext(UserContext);
    

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [specialities_data, SetSpecialitiesData] = useState([]);

    useEffect(() => {

        SetCurrentPage('home');

        const fetch_home_page_data = async() => {

            try{

                const url = '/api/fetch_home_page_data/';

                const response = await fetch(url, {
                    method : 'GET',
                    headers : {
                        'Content-Type' : 'application/json',
                    },
                });

                const data = await response.json();

                if(response.ok){

                    setTimeout(() => {
                        setLoading(false);
                        SetSpecialitiesData(data.specialities_data);
                        
                        console.log('Success in getting the home page data');
                    }, 2000);
                }

                else{
                    console.log('Failed to get the home page data');
                }
            }

            catch(error){
                console.log('Getting error in fetching the home page data');
            }
        }

        fetch_home_page_data();
        
    }, []);

    return (
        <div>
        {loading ? (
            <div className="loader-container">
            <i className="fa-regular fa-snowflake icon-loader"></i>
            <div className="loader-text">Please wait while loading...</div>
            </div>
        ) : (
            <div className='main-container'>

            <div className='middle-container'>

                <div className='home-page-container'>

                    <div className='home-image-container'>
                        <div className='main-image'><img src="https://img.freepik.com/free-psd/interior-modern-emergency-room-with-empty-nurses-station-generative-ai_587448-2137.jpg" alt="" /></div>
                        <div className='image-text'>Search for the Best Treatment<br/>Today. Tommorrow. Always</div>
                    </div>
                </div>

                

                <div className='home-page-container-1'>
                        <div className='heading'>Discover the Centres of Clinical Excellence in Hyderabad</div>
                        <div className='inner-text-home'>At Growwell Hospitals Hyderabad, we bring together world-class technology, experienced specialists, and a patient-centred approach to redefine healthcare. With a commitment to innovation and excellence, we cater to diverse medical needs not only for Hyderabad but also from across India and abroad.</div>
                
                    
                        <div className="home-page-cards-container">
                            {(specialities_data).map((speciality, index) => (
                                <div className="home-page-cards" key={index}>
                                    <div className='left-home-page-cards'>
                                        <i className="fa-solid fa-brain"></i>
                                    </div>

                                    <div className='right-home-page-cards'>
                                        <div>{speciality.speciality}</div>
                                        <div>{speciality.description}</div>
                                        <div><button
                                            onClick={(e) => {navigate('/doctors'); SetSelected(1);}}
                                        >Find Doctor <i className="fa-solid fa-arrow-right-to-bracket right-arrow-icon"></i></button></div>

                                    </div>
                                </div>
                            ))}

                        </div>
                        
                </div>

                <div className='book-appointment-container'>
                        <div>Book an Appointment Now</div>
                        <div><button onClick={(e) => {navigate('/doctors'); SetSelected(1);}}>Book Appointment <i className="fa-solid fa-arrow-right-to-bracket right-arrow-icon"></i></button></div>
                </div>

                    <div className='uses-cards-home-container'>
                    <div className='uses-page-cards-container'>
                            <div className='uses-page-cards'>
                                <div><i className="fa-solid fa-truck-medical home-page-uses-icons"></i></div>
                                <div>24/7 Emergency Care</div>
                                <div>24/7 Comprehensive Emergency Care you can rely on, anytime. Equipped with cutting-edge ICUs ensuring uninterrupted critical support.”</div>

                            </div>

                            <div className='uses-page-cards'>
                                <div><i className="fa-solid fa-user-doctor home-page-uses-icons"></i></div>
                                <div>Expert Doctors</div>
                                <div>A team of highly qualified specialists across diverse medical fields. Delivering complete, personalized care under one roof.</div>

                            </div>

                            <div className='uses-page-cards'>
                                <div><i className="fa-solid fa-microscope home-page-uses-icons"></i></div>
                                <div>Advanced Technology</div>
                                <div>State-of-the-art MRI, CT scan, robotic surgery, and advanced diagnostics. Delivering precise results and world-class treatment outcomes.”</div>

                            </div>

                            <div className='uses-page-cards'>
                                <div><i className="fa-solid fa-hand-holding-medical home-page-uses-icons"></i></div>
                                <div>Affordable Treatment</div>
                                <div>World-class healthcare made accessible at affordable costs. Seamless insurance support for stress-free treatment.</div>

                            </div>

                            <div className='uses-page-cards'>
                                <div><i className="fa-solid fa-bed home-page-uses-icons"></i></div>
                                <div>Patient-Centered Care</div>
                                <div>Personalized treatment plans designed for every patient’s needs. Compassionate staff and modern facilities ensuring comfort and care.</div>

                            </div>

                            <div className='uses-page-cards'>
                                <div><i className="fa-solid fa-prescription-bottle-medical home-page-uses-icons"></i></div>
                                <div>Pharmacy & Labs</div>
                                <div>In-house pharmacy, blood bank, and diagnostic labs under one roof. Ensuring quick access to medicines, tests, and emergency support.</div>

                            </div>

                            </div>

                            <div className='footer-home-page'>
                                <div className='inner-footer-div'>
                                    <div><i className="fa-regular fa-snowflake hospital-icon"></i></div>
                                    <div>Growwell Hospitals</div>
                                    </div>
                                <div className='inner-footer-div'>
                                    <div>Emergency Helpline</div>
                                    <div>108</div>
                                </div>

                                <div className='inner-footer-div'>
                                    <div>Growwell Lifeline</div>
                                    <div>+91 9999911111</div>
                                </div>

                                <div className='inner-footer-div'>
                                    <div>Health Lifeline</div>
                                    <div>1860-500-1066</div>
                                </div>
                            </div>

                            <div className='copy-right-footer'>
                                <div className="footer-brand-container">
                                    <div>You can follow us on </div>
                                    <div><i className="fa-brands fa-instagram footer-brand-icons"></i></div>
                                    <div><i className="fa-brands fa-twitter footer-brand-icons"></i></div>
                                    <div><i className="fa-brands fa-facebook footer-brand-icons"></i></div>
                                    <div><i className="fa-brands fa-whatsapp footer-brand-icons"></i></div>
                                </div>
                                <div>&copy; Growwell Hospitals. All rights resevered</div>
                            </div>
                    </div>

            </div>

            
        </div>
        )}
        </div>
    );
    }

