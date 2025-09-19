import '../App.css';
import '../index.css';

import {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './Global_context_variables';



export default function DiagnosticCenter(){

    const [diagnosis_tests, SetDiagnosisTests] = useState([]);
    const [diagnosis_tests_description, SetDiagnosisTestsDescription] = useState([]);
    const {SetCurrentPage} = useContext(UserContext);
    
    const navigate = useNavigate();

    useEffect(() => {

        SetCurrentPage('diagnostic_center');

        const url = '/api/diagnosis_main_tests/';

        const fetch_diagnosis_tests_info = async () => {

            try{
                const response = await fetch(url, {
                    method : 'GET', 
                    headers : {
                        'Content-Type' : 'application/json',
                    },
                });

                const data = await response.json();

                if(response.ok){
                    SetDiagnosisTests(data.diagnosis_maintests_names);
                    SetDiagnosisTestsDescription(data.diagnosis_maintests_description);
                    console.log('Success in fetching the diagnosis main tests');
                    
                }
                else{
                    console.log('Failed');
                }
            }

            catch(error){
                console.log(`Error occured ${error}`);
            }
        }

        fetch_diagnosis_tests_info();
    }, []);

    const main_test_icons = [
        [<i className="fa-solid fa-droplet"></i>, '#740600ff'],
        [<i className="fa-solid fa-x-ray"></i>, 'black'],
        [<i className="fa-solid fa-heart-pulse"></i>, '#ef0c0cff'],
        [<i className="fa-solid fa-lungs-virus"></i>,  'brown'],
        [<i className="fa-solid fa-vial-virus"></i>, 'green'],
        [<i className="fa-solid fa-staff-snake"></i>, '#00617c'],
        [<i className="fa-solid fa-disease"></i>, '#00b856ff'],
        [<i className="fa-solid fa-pills"></i>,'#009fcbff'],
    ]

    return(
        <div className = 'main-container'>
            
            <div className='diagnostic-main-container'>

                <div className='page-headings'>
                    <div><i className="fa-solid fa-microscope inner-icons"></i></div>
                    <div>Diagnostic Center</div>
                    </div>
            <div className='diagnosis-main-tests-container'>
                
                
                {diagnosis_tests.map((test, index) => ( 
                    
                    <div className='diagnosis-main-tests-inner-container' key={index}
                        onClick={() => {navigate('/diagnosis_subtests', {state : {'maintest_index' : index}});}}
                    >

                    <div className='diagnosis-main-tests-cards' style = {{color : main_test_icons[index][1]}}>
                        
                        <div className='diagnosis-main-tests-subcontainer'>
                    <div className='first-left-container'>

                   

                    {main_test_icons[index][0]}
                    </div>
                    <div className='second-left-container'>
                            <button 
                            >{test} &nbsp;&nbsp;<i className="fa-solid fa-right-to-bracket diagnostic-icons"></i></button>

                        </div>

                    
                    </div>
                    
                    </div>
                    <div className='inner-text-home inner-text' >{diagnosis_tests_description[index]}</div>
                </div>
                    
                ))}
                
            </div>
            </div>
        
        </div>
    );
}