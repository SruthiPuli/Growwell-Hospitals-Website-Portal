from django.urls import path
from . import views 

urlpatterns = [
    path('fetch_home_page_data/', views.fetch_home_page_data, name='fetch_home_page_data'),
    path('check_user_name_exists/', views.check_username_exists, name = 'check_username_exists'),
    path('validate_email/', views.validate_email, name = 'validate_email'),
    path('register_user/', views.register_user, name = 'register_user'),
    path('login_user/', views.login_user, name = 'login_user'),
    path('fetch_user_details/', views.fetch_user_details, name = 'fetch_user_details'),
    path('fetch_doctors_info/', views.fetch_doctors_info, name = 'fetch_doctors_info'),
    path('fetch_doctors_schedules/', views.fetch_doctors_schedules, name ='fetch_doctors_schedules'),
    path('book_appointment/', views.book_appointment, name = 'book_appointment'),
    path('diagnosis_main_tests/', views.diagnosis_main_tests, name = 'diagnosis_main_tests'),
    path('fetch_diagnosis_subtests/', views.fetch_diagnosis_subtests, name = 'fetch_diagnosis_subtests'),
    path('fetch_user_appointments/', views.fetch_user_appointments, name = 'fetch_user_appointments'),

]
