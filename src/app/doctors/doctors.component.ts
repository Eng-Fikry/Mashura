import { Component } from '@angular/core';
import { NavbarDoctorComponent } from "../Additions/navbar-doctor/navbar-doctor.component";
import { DoctorService } from '../Services/doctor/doctor.service';
import { Doctorinfos } from '../interfaces/doctorinfos';
import { RouterLink } from '@angular/router';
import { Clinic } from '../interfaces/clinic';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [NavbarDoctorComponent,RouterLink],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent {
  constructor(private _DoctorService:DoctorService) { }
  Clinics!:any


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDoctorClinics();
  }
  getDoctorClinics() {
    this._DoctorService.getDoctorClinics().subscribe({
      next: (response) => {
        console.log(response);
        this.Clinics = response;
      },
      error: (error) => {
        console.log(error);
      }



    });
  }


}
