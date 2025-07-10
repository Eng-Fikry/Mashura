import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { HomeComponent } from './Pages/home/home.component';
import { ClinicsComponent } from './Pages/clinics/clinics.component';
import { HomeClientComponent } from './Pages/home-client/home-client.component';
import { AppointmentComponent } from './Pages/appointment/appointment.component';
import { AddServiceComponent } from './Pages/add-service/add-service.component';
import { DoctorappointmentsComponent } from './Pages/doctorappointments/doctorappointments.component';
import { ResetpasswordComponent } from './Pages/resetpassword/resetpassword.component';
import { DoctorProfileComponent } from './Pages/doctor-profile/doctor-profile.component';
import { ClinicsPatientComponent } from './Pages/clinics-patient/clinics-patient.component';
import { PatientProfileComponent } from './Pages/patient-profile/patient-profile.component';
import { NotFoundComponent } from './Additions/not-found/not-found.component';
import { UserprofileComponent } from './Additions/userprofile/userprofile.component';
import { ForgetpasswordComponent } from './Pages/forgetpassword/forgetpassword.component';
import { PatientappointmentsComponent } from './Pages/patientappointments/patientappointments.component';
import { UpdateappointmentComponent } from './Pages/updateappointment/updateappointment.component';
import { ApplicationComponent } from './Pages/application/application.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorClinicsComponent } from './doctor-clinics/doctor-clinics.component';
import { HistoryComponent } from './history/history.component';
import { ShowhistoryComponent } from './showhistory/showhistory.component';
import { DoctorssclinicsComponent } from './Pages/doctorssclinics/doctorssclinics.component';
import { UpdateclinicComponent } from './Additions/updateclinic/updateclinic.component';

export const routes: Routes = [
    {path:'',redirectTo:'HomeClient', pathMatch:'full'},
    {path:'Login',component:LoginComponent},
    {path:'Signup',component:SignupComponent},
    {path:'Home',component:HomeComponent},
    {path:'Clinics/:id',component:ClinicsComponent},
    {path:'Clinics-Patient/:id',component:ClinicsPatientComponent},
    {path:'HomeClient',component:HomeClientComponent},
    {path:'appointment/:idClinic/:idDoctor',component:AppointmentComponent},
    {path:'addservice',component:AddServiceComponent},
    {path:'doctorappointments',component:DoctorappointmentsComponent},
    {path:'resetpassword',component:ResetpasswordComponent},
    {path:'doctorprofile',component:DoctorProfileComponent},
    {path:'patientprofile',component:PatientProfileComponent},
    {path:'userprofile',component:UserprofileComponent},
    {path:'forgetpassword',component:ForgetpasswordComponent},
    {path:'patientappointments',component:PatientappointmentsComponent},
    {path:'updateappointment/:idClinic/:idDoctor/:appointmentId',component:UpdateappointmentComponent},
    {path:'application/:idClinic/:idDoctor/:appointmentId',component:ApplicationComponent},
    {path:'doctors',component:DoctorsComponent},
    {path:'DoctorClinics',component:DoctorClinicsComponent},
    {path:'history/:id',component:HistoryComponent},
    {path:'showhistory/:id',component:ShowhistoryComponent},
    {path:'doctorClinics',component:DoctorssclinicsComponent},
    {path:'updateclinic/:id',component:UpdateclinicComponent},
    {path:'**',component:NotFoundComponent},
];
