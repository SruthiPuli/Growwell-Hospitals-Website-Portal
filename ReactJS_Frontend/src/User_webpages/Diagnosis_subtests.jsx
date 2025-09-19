import '../App.css';
import '../index.css';

import { useNavigate , useLocation} from 'react-router-dom';
import { useEffect , useState } from 'react';
import { useContext } from 'react';
import { UserContext } from './Global_context_variables';

export default function DiagnosisSubtests(){


    const location = useLocation();
    const [diagnosis_subtests_list, SetDiagnosisSubTestsList] = useState([]);
    const [consultation_fee_list, SetConsultationFeeList] = useState([]);
    const maintest_index = location.state || {};
    const {SetCurrentPage} = useContext(UserContext);
    

    useEffect(() => {

        SetCurrentPage('diagnosis_subtests');
        if(maintest_index.maintest_index === null){
            console.log('Nothing there');
            return;
        }

        const FetchSubTestsInfo = async () => {

            const url = `/api/fetch_diagnosis_subtests/?tests_index=${maintest_index.maintest_index}`;

            try {

                const response = await fetch(url, {
                    method : 'GET',
                    headers : {
                        'Content-Type' : 'application/json',
                    },
                });

                const data = await response.json();

                if(response.ok){
                    SetDiagnosisSubTestsList(data.subtests_list);
                    SetConsultationFeeList(data.consultation_fee);
                    console.log('Success');
                }

            }

            catch(error){
                console.log('Getting error',  error);
            }
        }

        FetchSubTestsInfo();

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
        <div className='main-container'>

            <div className='subtests-main-container'>

                <div className='page-headings'>
                    <div><i className="fa-solid fa-microscope inner-icons"></i></div>
                    <div>Diagnostic Center</div>
                    </div>

            <div className='subtests-container'>

                {diagnosis_subtests_list.map((subtest, index) => (

                    <div className='subtests-cards' key={index}>

                        <div style = {{color : main_test_icons[maintest_index.maintest_index][1]}}>{main_test_icons[maintest_index.maintest_index][0]}</div>

                        <div >
                            {subtest}
                        </div>

                        <div>
                            Consultation Fee : &nbsp;Rs.&nbsp;{consultation_fee_list[index]}
                        </div>

                    </div>
                ))}

            </div>
            </div>
        </div>
    );
}