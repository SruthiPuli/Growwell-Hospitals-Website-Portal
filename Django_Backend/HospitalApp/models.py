from django.db import models

# Create your models here.

class Users(models.Model) :

    username = models.CharField(max_length = 20, unique = True)
    email_id = models.EmailField(max_length=40, unique=True)
    password = models.CharField(max_length = 30)

    def __str__(self) :
        return self.username



class Specialities(models.Model) :

    speciality = models.CharField(max_length=125)
    description = models.CharField(max_length=2000)

    def __str__(self) :

        return f'{self.speciality}'


class Doctors(models.Model) :

    doctor_name = models.CharField(max_length=50)
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=30)
    specialization = models.CharField(max_length=125)
    degree = models.CharField(max_length=200)
    experience = models.PositiveIntegerField()
    consultation_fee = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self) :
        return self.username

    
class Patients(models.Model) :

    fullname = models.CharField(max_length=40)
    gender = models.CharField(max_length=25)
    mobile_no = models.CharField(max_length=10)
    dateofbirth = models.DateField()

    def __str__(self) :
        return self.fullname
    

class Schedules(models.Model) :

    doctor = models.ForeignKey(Doctors, on_delete=models.CASCADE, related_name = "schedules")
    dates = models.DateField()
    timeslots = models.JSONField()

    def __str__(self) :
        return f'{self.doctor.doctor_name} on {self.dates}'
    

class Appointments(models.Model) :

    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="appointments")
    patient = models.ForeignKey(Patients, on_delete = models.CASCADE, related_name = 'appointments')
    doctor = models.ForeignKey(Doctors, on_delete=models.CASCADE, related_name="appointments")
    dates = models.DateField()
    timeslot = models.CharField(max_length=20)
    payment_mode = models.CharField(max_length=20, choices = [('online', 'online'), ('offline', 'offline')], default = 'offline')

    @property
    def day(self) :
        return self.dates.strftime('%A')
    
    def __str__(self) :
        return f'{self.user.username} booked {self.doctor.doctor_name} on {self.dates} at {self.timeslot}'
    


class DiagnosisTests(models.Model) :

    testname = models.CharField(max_length=150)
    test_description = models.CharField(max_length=300, default = 'Description')

    def __str__(self):
        return self.testname

class DiagnosisSubTests(models.Model) :

    maintest = models.ForeignKey(DiagnosisTests, on_delete=models.CASCADE, related_name='subtests')
    subtest = models.CharField(max_length=150)
    consultation_fee = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        
        return f'{self.maintest} having subtest {self.subtest} with fee {self.consultation_fee}'
    
