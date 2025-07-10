import { Component } from '@angular/core';
import { ClinicService } from '../../Services/clinic/clinic.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppointmentService } from '../../Services/appointment/appointment.service';
import { DoctorService } from '../../Services/doctor/doctor.service';
import { Doctorinfos } from '../../interfaces/doctorinfos';
import { Clinic } from '../../interfaces/clinic';
import { AppointmentForm } from '../../interfaces/appointment-form';
import { NavbarClientComponent } from "../../Additions/navbar-client/navbar-client.component";

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [RouterLink, NavbarClientComponent],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent {
      constructor(private _ClinicService:ClinicService,private toastr: ToastrService,private _Router: Router,private _AppointmentService:AppointmentService,private _ActivatedRoute:ActivatedRoute,private _DoctorService:DoctorService) { }
  

      docid: number = Number(this._ActivatedRoute.snapshot.paramMap.get('idDoctor'));
      clinid: number = Number(this._ActivatedRoute.snapshot.paramMap.get('idClinic'));
      appointmentId: number = Number(this._ActivatedRoute.snapshot.paramMap.get('appointmentId'));
      //application/:idClinic/:idDoctor/:appointmentId
      doctorinfos!:Doctorinfos
      clinicInfos!:Clinic
      appointmentInfos!:AppointmentForm
      

      ngOnInit(): void {
        if (typeof window !== 'undefined') {
          // sessionStorage.setItem('page', `/application/${this.clinid}/${this.docid}/${this.appointmentId}`);
          sessionStorage.setItem('page', `/HomeClient`);
        }
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.getdoctorInfos();
        this.getClinicInfos();
        this.getAppointmentInfos();
      }



      getdoctorInfos()
      {
        this._DoctorService.getDoctorid(this.docid).subscribe({
          next: (response) => 
            {
              console.log(response);
              this.doctorinfos=response;
            },
            error: (error) =>
              {
                console.log(error); 
              }
          
        })
  
      }

      getClinicInfos()
      {
        this._ClinicService.getClinicById(this.clinid).subscribe({
          next: (response) => 
            {
              console.log(response);
              this.clinicInfos=response;
            },
            error: (error) =>
              {
                console.log(error); 
              }
          
        })
  
      }

      getAppointmentInfos()
      {
        this._AppointmentService.getAppointmentById(this.appointmentId).subscribe({
          next: (response) => 
            {
              console.log(response);
              this.appointmentInfos=response;
            },
            error: (error) =>
              {
                console.log(error); 
              }
          
        })
  
      }
}
