from django.shortcuts import render

# Create your views here.

from django.views.decorators.csrf import csrf_exempt
import json
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from datetime import date, datetime, timedelta

from django.http import JsonResponse
from .models import Specialities, Users, Doctors, Schedules, Patients, Appointments, DiagnosisTests, DiagnosisSubTests
from django.conf import settings


def fetch_home_page_data(request) :

    if(request.method == 'GET'):

        try : 

            specialities = list(Specialities.objects.all().order_by('id'))

            specialities_data = []

            for obj in specialities :
                
                obj_data = {
                    'speciality' : obj.speciality,
                    'description' : obj.description,
                }

                specialities_data += [obj_data]

            return JsonResponse({'specialities_data' : specialities_data}, status = 200)
        
        except Exception as e :

            
            return JsonResponse({'status' : 'Getting error'}, status = 500)
        
    else :

        return JsonResponse({'status' : 'invalid method'}, status = 405)


def check_username_exists(request) :

    if(request.method == 'GET') :

        try : 

            username = request.GET.get('username')
            exists = False
            
            exists = Users.objects.filter(username = username).exists()


            return JsonResponse({'exists' : exists}, status = 200)
        
        except Exception as e :
            return JsonResponse({'error' : 'Error occured in fetching the database'}, status = 500)
        
            

def send_verification_mail(user_email) :

    email_verification_code = get_random_string(length = 6, allowed_chars = '0123456789')

    subject = 'Email Verification'
    message = f'Your verification code for Grow Well hospitals is : {email_verification_code}'

    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [user_email]

    send_mail(subject=subject, message=message, from_email=from_email, recipient_list=recipient_list, fail_silently=False)

    return email_verification_code


def validate_email(request) :
    if(request.method == 'GET') :

        try : 
            email_id = request.GET.get('email_id')

            email_exists = Users.objects.filter(email_id = email_id).exists()

            if(email_exists):
                return JsonResponse({'status' : 'Failed', 'message' : 'Email already exists, Provide a new one'}, status = 200)
            

            #email_code = send_verification_mail(email_id)


            return JsonResponse({'status' : 'Success', 'email_verification_code' : ''"""email_code"""}, status = 200)
        
        except Exception as e :

            
            return JsonResponse({'status' : 'Failed', 'message' : 'Getting error'}, status = 500)
        
    else :
        return JsonResponse({'status' : 'Failed', 'message' : 'Invalid method'}, status = 405)


@csrf_exempt
def register_user(request) :

    if(request.method == 'POST') :
        data = json.loads(request.body)

        try :

            username = data.get('username')
            email_id = data.get('email_id')
            password = data.get('password')

            user = Users(
                username = username,
                email_id = email_id,
                password = password
            )
            user.save()

            return JsonResponse({'status' : 'User Registered Successfully'}, status = 200)
        
        except Exception as e :
            
            return JsonResponse({'status' : 'Getting error in creating the user'}, status = 500)

    else :
        return JsonResponse({'status' : 'Invalid Method'}, status = 405) 

@csrf_exempt
def login_user(request) :

    if(request.method == 'POST') :

        data = json.loads(request.body)

        try :

            username = data.get('username')
            password = data.get('password')

            user_exists = Users.objects.filter(username = username, password = password).exists()
            
            
            return JsonResponse({'exists' : user_exists})       

        except Exception as e :
            return JsonResponse({'error' : str(e)}, status=500)
        
def fetch_user_details(request) : 

    if(request.method == 'GET') :

        try : 

            current_user = request.GET.get('current_user')
            if not current_user:
                return JsonResponse({'status': 'Failed', 'error': 'No username provided'}, status=400)

            try:
                user_obj = Users.objects.get(username=current_user)
                return JsonResponse({'status': 'success', 'email_id': user_obj.email_id}, status=200)

            except Users.DoesNotExist:
                return JsonResponse({'status': 'Failed', 'error': 'User not found'}, status=404)
            except AttributeError as e:
                return JsonResponse({'status': 'Failed', 'error': str(e)}, status=500)
        except Exception as e:
            return JsonResponse({'status': 'Failed', 'error': str(e)}, status=500)
    
    else :

        return JsonResponse({'status' : 'Invalid Method'}, status = 405)


        

def fetch_doctors_info(request) :

    if request.method == 'GET' :
        data = None

        try :

            doctors_info = Doctors.objects.values_list('doctor_name', 'experience' , 'specialization', 'degree','consultation_fee')
            data = [list(d) for d in doctors_info]

            return JsonResponse({'doctors_info' : data}, safe=False, status = 200)

        except Exception :
            return JsonResponse({'error' : 'error occured in fetching the data'}, status = 500)
        
    else :
        return JsonResponse({'error' : 'Invalid Method'}, status = 405)
        

def get_timeslots() :

    timeslots = [
        ['9:00 am - 9:30 am', True], ['9:30 am - 10:00 am', True],
        ['10:00 am - 10:30 am', True], ['10:30 am - 11:00 am', True],
        ['11:00 am - 11:30 am', True], ['11:30 am - 12:00 pm', True],
        ['12:00 pm - 12:30 pm', True],['12:30 pm - 1:00 pm', True],
        ['2:00 pm - 2:30 pm', True],['2:30 pm - 3:00 pm', True],
        ['3:00 pm - 3:30 pm', True],['3:30 pm - 4:00 pm', True],
        ['4:00 pm - 4:30 pm', True],['4:30 pm - 5:00 pm', True],
        ['5:00 pm - 5:30 pm', True],['5:30 pm - 6:00 pm', True],
        ['6:00 pm - 6:30 pm', True],['6:30 pm - 7:00 pm', True],
        ['7:00 pm - 7:30 pm', True],['7:30 pm - 8:00 pm', True],
    ]

    return timeslots

def get_remaining_dates(index) :

    window_size = 20
    today = date.today()
    doctor = Doctors.objects.get(id = index+1)
    schedules = list(Schedules.objects.filter(doctor = doctor, dates__gte = today))
    existing_dates = [sched.dates for sched in schedules]
    length = len(schedules)

    rmng_dates = []
    

    for i in range(window_size - length) :
        rmng_dates += [today + timedelta(days = i + length)]


    Schedules.objects.filter(doctor = doctor, dates__lt = today).delete()

    return (existing_dates, rmng_dates, length)


def update_and_get_schedules(index) :

    
    doctor = Doctors.objects.all().order_by('id')[index]

    

    existing_dates, rmng_dates, length = get_remaining_dates(index)
    timeslots = get_timeslots()

    for date in rmng_dates :

        schedule = Schedules(
            doctor = doctor, 
            dates = date, 
            timeslots = json.dumps(timeslots),
            )

        schedule.save()


    return 'success'


def fetch_doctors_schedules(request) :

    

    if (request.method == 'GET') :

        try :

            index = int(request.GET.get('doctor_index'))
            

            update_and_get_schedules(index)

            doctor = Doctors.objects.get(id = index+1)
            
            dates = list(Schedules.objects.filter(doctor = doctor).values_list('dates', flat = True))

            dates = [d.strftime('%d %b %Y, %A') for d in dates]
            
            timeslots_json = list(Schedules.objects.filter(doctor = doctor).order_by('dates').values_list('timeslots', flat = True))
            
            timeslots = []
            for t in timeslots_json :
                timeslots += [json.loads(t)]

            
            return JsonResponse({'dates' : dates, 'timeslots' : timeslots}, status = 200)
        
        except Exception as e :
            
            return JsonResponse({'error' : f'Getting error in fetching the data{e}'}, status = 500)
        
    else :

        return JsonResponse({'error' : 'Invalid Method'}, status = 405)


def send_appointment_booked_mail(
    user_email, 
    patient_name, 
    gender, 
    mobile_no, 
    dob, 
    appointment_day, 
    appointment_date, 
    timeslot, 
    doctor_name, 
    specialization
):
    subject = f'Appointment Confirmation in Growwell Hospitals for Dr. {doctor_name}, {specialization}'
    
    message = f"""
        Dear {patient_name},

        Your appointment has been successfully booked. Please find the details below:

        Doctor: {doctor_name} ({specialization})

        Patient Name: {patient_name}
        Gender: {gender}
        Mobile Number: {mobile_no}
        Date of Birth: {dob}
        Appointment Date: {appointment_day}, {appointment_date}
        Time Slot: {timeslot}

        We kindly request you to arrive at least 30 minutes before your scheduled appointment.

        If you have any questions or need to reschedule, please contact us at Growwell Hospitals.
        """

    send_mail( subject, message, settings.DEFAULT_FROM_EMAIL,  [user_email], fail_silently=False )


  
@csrf_exempt
def book_appointment(request) :

    if(request.method == 'POST') :

        try :
            

            data = json.loads(request.body)
            user = data.get('user')
            doctor_index = data.get('current_doctor')
            date = data.get('date')
            timeslot_idx = data.get('timeslot')
            payment_mode = data.get('payment_mode')

            patients_info = data.get('patients_info')

            
            user_obj = Users.objects.get(username = user)
            
            
            doctor_obj = Doctors.objects.get(id = doctor_index + 1)
            
            
            schedules = doctor_obj.schedules.all().order_by('dates')[int(date)]
            date = schedules.dates
            
            slots = json.loads(schedules.timeslots) 
            

            patient_obj = None

            try :

                patient_obj = Patients(
                    fullname = patients_info.get('fullname'),
                    gender = patients_info.get('gender'),
                    dateofbirth = patients_info.get('dateofbirth'),
                    mobile_no = patients_info.get('mobileno'),
                )

                patient_obj.save()

                

            except Exception as e :
                print('Getting error as ', e)
                

            
            try:
                appointment = Appointments(
                    user=user_obj,
                    patient = patient_obj,
                    doctor=doctor_obj,
                    dates=date,
                    timeslot=slots[timeslot_idx][0],
                    payment_mode=payment_mode,
                )
                appointment.save()
                
            except Exception as e:
                print('Getting error as ' , e)
            

            
            updated_timeslots = json.loads(schedules.timeslots)
            updated_timeslots[timeslot_idx][1] = False
            schedules.timeslots = json.dumps(updated_timeslots)  
 


            schedules.save()

            

            """send_appointment_booked_mail(
                user_email=user_obj.email_id,
                patient_name=patients_info.get('fullname'),
                gender=patients_info.get('gender'),
                mobile_no=patients_info.get('mobileno'),
                dob=patients_info.get('dateofbirth'),
                appointment_day=date.strftime('%A'),
                appointment_date=date,
                timeslot=get_timeslots()[timeslot_idx][0],
                doctor_name=doctor_obj.doctor_name,
                specialization=doctor_obj.specialization,
            )"""

            return JsonResponse({'message' : 'Successfully Booked the appointment'}, status = 200)
        
        except Exception as e :

            return JsonResponse({'message' : 'Getting error in updating and booking the appointment'}, status = 500)
        
    else :

        return JsonResponse({'message' : 'Invalid Method'}, status = 405)


def diagnosis_main_tests(request) :

    if(request.method == 'GET') :

        try : 

            diagnosis_maintests_names = list(DiagnosisTests.objects.all().values_list('testname', flat = True))
            diagnosis_maintests_description = list(DiagnosisTests.objects.all().values_list('test_description', flat = True))

            
            
            return JsonResponse({'status' : 'success' ,  'diagnosis_maintests_names' : diagnosis_maintests_names, 'diagnosis_maintests_description' : diagnosis_maintests_description},  status = 200)
    
        except Exception as e :

            

            return JsonResponse({'status' : 'Failure', 'message' : 'Getting error'} , status = 500)
    else :

        return JsonResponse({'status' : 'Failure', 'message' : 'Invalid method'}, status = 405)
    
    

def fetch_diagnosis_subtests(request) :

    if(request.method == 'GET') :

        try : 

            tests_index = request.GET.get('tests_index')

            maintest = DiagnosisTests.objects.all().order_by('id')[int(tests_index)]

            

            subtests_lists = list(maintest.subtests.all())

            subtests_lists_info = []; consultation_fee_list = []

            for idx in range(len(subtests_lists)) : 

                subtests_lists_info += [subtests_lists[idx].subtest]

                consultation_fee_list += [int(subtests_lists[idx].consultation_fee)]

            return JsonResponse({'status' : 'success' ,  'subtests_list' : subtests_lists_info ,'consultation_fee' : consultation_fee_list}, status = 200)
        
        except Exception as e :

            

            return JsonResponse({'status' : 'failure', 'message' : 'Getting error'}, status = 500)

    else :

        return JsonResponse({'status' : 'failure', 'message' : 'invalid method'}, status = 405)


def fetch_user_appointments(request) :

    if(request.method == 'GET') :

        try :

            current_user = request.GET.get('current_user')

            timeframe = request.GET.get('timeframe')

            current_user_obj = Users.objects.get(username = current_user)

            tomorrow = date.today() + timedelta(days = 1)


            user_appointments = []

            if(timeframe == 'previous') : 

                user_appointments = list(current_user_obj.appointments.filter(dates__lt = date.today()).order_by('dates', 'timeslot'))

            elif(timeframe == 'upcoming') :

                user_appointments = list(current_user_obj.appointments.filter(dates__gte = date.today()).order_by('dates', 'timeslot'))

            user_appointments_list = [

                {
                    
                    'doctor_info' : {
                        'Doctor Name' : appointment.doctor.doctor_name, 
                        'Specialization' : appointment.doctor.specialization,  
                        'Experience' : f'{appointment.doctor.experience} years Experience', 
                        'Consultation Fee' : f'Rs.{appointment.doctor.consultation_fee}',
                    },

                    'patients_info' : {
                        'Patient Name' : appointment.patient.fullname,
                        'Gender' : appointment.patient.gender,
                        'Date of Birth' : (appointment.patient.dateofbirth).strftime('%d-%b-%Y'), 
                        'Mobile No' : appointment.patient.mobile_no,
                    },

                }

                for appointment in user_appointments
            ]

            user_appointments_list_timings = [
                {
                      'timings' : {
                        'Date' : (appointment.dates).strftime('%d-%b-%Y'),
                        'Day' : appointment.day,
                        'Timeslot' : appointment.timeslot,
                        'Payment Mode' : appointment.payment_mode,
                    },
                }
                for appointment in user_appointments
            ]      

            return JsonResponse({'status' : 'success' , 'user_appointments_list' : user_appointments_list, 'user_appointments_list_timings' : user_appointments_list_timings}, status = 200)
        
        except Exception as e :

            return JsonResponse({'status' : 'Failed', 'message' : 'Getting error in fetching'}, status = 500)
        
    else :

        return JsonResponse({'status' : 'Failed', 'message' : 'Invalid method'}, status = 405)



