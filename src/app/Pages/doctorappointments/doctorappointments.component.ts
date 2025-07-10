import { AppointmentForm, AppointmentForm2 } from './../../interfaces/appointment-form';
import { Component, signal } from '@angular/core';
import { NavbarDoctorComponent } from "../../Additions/navbar-doctor/navbar-doctor.component";
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../Services/doctor/doctor.service';
import { PatientService } from '../../Services/patient/patient.service';
import { AppointmentService } from '../../Services/appointment/appointment.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FilterPatientIdPipe } from '../../filter-patient-id-pipe.pipe';

@Component({
  selector: 'app-doctorappointments',
  standalone: true,
  imports: [NavbarDoctorComponent,RouterLink,FormsModule,FilterPatientIdPipe],
  templateUrl: './doctorappointments.component.html',
  styleUrl: './doctorappointments.component.css'
})
export class DoctorappointmentsComponent {
  constructor(private _Router:Router,private toaster:ToastrService,private _DoctorService:DoctorService,private _PatientService:PatientService,private _AppointmentService:AppointmentService) { }
   searchTerm: string = '';
  doctorAppointments = signal<AppointmentForm[]>([]);
  DoneAppointments = signal<AppointmentForm[]>([]);
  ConfirmedAppointments = signal<AppointmentForm[]>([]);
  appointment!:AppointmentForm2


  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('page', '/doctorappointments');
    }
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAppointments();
  }
   
getAppointments()
{
  this._AppointmentService.getAppointmentsByDoctorId().subscribe(

    {
      next:(response)=>
      {
        this.doctorAppointments.set(response);
        this.DoneAppointments.set(this.doctorAppointments().filter((x:AppointmentForm)=>x.status=='Completed'));
        this.ConfirmedAppointments.set(this.doctorAppointments().filter((x:AppointmentForm)=>x.status=='Confirmed'));
        
        console.log(this.doctorAppointments());
      },
      error:(error)=>
      {
        this.toaster.error("لا يوجد عيادات محجوزة");
      }
    }
  )
}

done(id:number)
{
  this._AppointmentService.getAppointmentById(id).subscribe(
    {
      next:(response)=>
      {
        this.appointment={
          doctorId:response.doctorId,
          clinicId:response.clinicId,
          patientId:response.patientId,
          dayOfWeek:response.day,
          time:response.time,
          status:'Completed',
          clinicName:response.clinicName
        }
        this.updateAppointment(id,this.appointment);

        console.log(response);
        console.log(this.appointment);
        this.DoneAppointments.set(this.doctorAppointments().filter((x:AppointmentForm)=>x.status=='Completed'));
        this.ConfirmedAppointments.set(this.doctorAppointments().filter((x:AppointmentForm)=>x.status=='Confirmed'));
        console.log(this.doctorAppointments().length);
        console.log(this.DoneAppointments().length);
        console.log(this.ConfirmedAppointments().length);
        this._Router.navigate([`/history/${this.appointment.patientId}`]);

      },
      error:(error)=>
      {
        this.toaster.error(error.message);
      }
    }
  )
   
  
  
}

updateAppointment(id:number,app:AppointmentForm2)
{
  this._AppointmentService.updateAppointment(id,app).subscribe(
    {
      next:(response)=>
      {
        // this.toaster.success(" تم الكشف  ");

        this.getAppointments();
      },
      error:(error)=>
      {
        this.toaster.error(error.message);
      }
    }
  )
}


ignore(id:number)
{
  console.log(id);
  this._AppointmentService.deleteAppointment(id).subscribe(
    {
      
      next:()=>
      {
        
        this.toaster.success("لقد تم الغاء الموعد بنجاح");
        this.getAppointments();

      },
      error:(error)=>
      {
        this.toaster.error(error.message);
      }
    }
  )
   
  
  
}


}
