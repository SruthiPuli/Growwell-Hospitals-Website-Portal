import '../App.css';
import '../index.css';
import Swal from "sweetalert2";

export const showAlertLoginRegisterSuccessful = (current_user_msg) => {
        Swal.fire({
        title: "Success!",
        text: `${current_user_msg}`,
        icon: "success",
        confirmButtonText: "OK",
        timer: 2000
        });
    };
export const showAlertMessage = (message) => {
  Swal.fire({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    icon: "info",
    title: message,
    color : 'black',
    
    customClass: {
      popup: 'popup-class',
      title: 'alert-class'
    }
  });
};

