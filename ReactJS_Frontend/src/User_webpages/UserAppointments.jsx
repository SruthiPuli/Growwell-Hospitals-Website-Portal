import '../App.css';
import '../index.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './Global_context_variables';

export default function UserAppointmentsPage() {
  const { current_user , SetCurrentPage} = useContext(UserContext);
  const [user_appointments_list, SetUserAppointments] = useState([]);
  const [user_appointments_list_timings, SetUserAppointmentsTimings] = useState([]);

  useEffect(() => {

    SetCurrentPage('user_appointments');
    if (!current_user) {
      alert('Please login to view the appointments');
      return;
    }

    const FetchUserAppointments = async () => {
      const url = `/api/fetch_user_appointments/?current_user=${current_user}&timeframe=upcoming`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          SetUserAppointments(data.user_appointments_list);
          SetUserAppointmentsTimings(data.user_appointments_list_timings);
          console.log('Success in fetching the user appointments');
        } else {
          console.log('Could not fetch the user appointments');
        }
      } catch (error) {
        console.log(`Error in fetching the user appointments: ${error}`);
      }
    };

    FetchUserAppointments();
  }, [current_user]);

  const timings_icons = [
    <i className="fa-solid fa-calendar appointment-icons"></i>,
    <i className="fa-solid fa-calendar-day appointment-icons"></i>,
    <i className="fa-solid fa-clock appointment-icons"></i>,
    <i className="fa-solid fa-credit-card appointment-icons"></i>,
  ];

  const headings_icons = [
    <i className="fa-solid fa-user-nurse appointment-heading-icons"></i>,
    <i className="fa-solid fa-user appointment-heading-icons"></i>,
    <i className="fa-solid fa-calendar-check appointment-heading-icons"></i>,
  ];

  const headings_names = ['Doctor', 'Patient', 'Appointment'];

  return (
    <div className="main-container">
      

      <div className="appointments-main-container">

      <div className="page-headings">
        <div>
          <i className="fa-solid fa-calendar-check inner-icons"></i>
        </div>
        <div>User Appointments</div>
        
      <div className="instruction-messages">
          Your Appointments in Growwell Hospitals.
        </div>
      </div>
        <div className="appointments-outer-container">
          {user_appointments_list.length === 0 && (
            <div>No Appointments found</div>
          )}

          {user_appointments_list.map((appointment, index) => (
            <div className="appointment-container" key={index}>
              <div className="appointments-inner-container">
                {Object.entries(appointment).map(([info_key, info_value], idx) => (
                  <div className="appointments-sub-container" key={idx}>
                    <div className="appointment-heading-container">
                      <div>{headings_icons[idx]}</div>
                      <div>{headings_names[idx]}</div>
                    </div>

                    {Object.entries(info_value).map(([subkey, subvalue], subidx) => (
                      <div key={subidx} className="appointment-sub-details">
                        <div className="right-content">{subvalue}</div>
                      </div>
                    ))}
                  </div>
                ))}

                <div className="appointments-sub-container">
                  <div className="appointment-heading-container">
                    <div>{headings_icons[2]}</div>
                    <div>{headings_names[2]}</div>
                  </div>
                  {user_appointments_list_timings[index] &&
                    Object.entries(user_appointments_list_timings[index].timings).map(
                      ([key, value], ind) => (
                        <div key={ind} className="timings-container">
                          <div>
                            {timings_icons[ind]} &nbsp;&nbsp;{value}
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>

                
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
