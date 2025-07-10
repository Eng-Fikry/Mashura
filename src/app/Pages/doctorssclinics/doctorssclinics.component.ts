import { Clinic } from './../../interfaces/clinic';
import { ClinicService } from './../../Services/clinic/clinic.service';
import { Component } from '@angular/core';
import { DoctorService } from '../../Services/doctor/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { NavbarDoctorComponent } from "../../Additions/navbar-doctor/navbar-doctor.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-doctorssclinics',
  standalone: true,
  imports: [NavbarDoctorComponent,RouterLink],
  templateUrl: './doctorssclinics.component.html',
  styleUrl: './doctorssclinics.component.css'
})
export class DoctorssclinicsComponent {
  constructor(private _DoctorService:DoctorService,private _ToastrService:ToastrService,private _ClinicService:ClinicService) { }
  Clinics : Clinic[] = []; 

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllClinics();
  }
  getAllClinics(){
    this._DoctorService.getDoctorClinics().subscribe(
      {
        next:(response) => {
          this.Clinics = response
          console.log(this.Clinics);
        },
        error:(error) => {
          this._ToastrService.error(error.error.message)
        }
      }
    );
  }

  deleteClinic(id:number){
    this._ClinicService.deleteClinic(id).subscribe(
      {
        next:(response) => {
          this._ToastrService.success("تم حذف العيادة بنجاح");
          this.getAllClinics();
        },
        error:(error) => {

          this._ToastrService.error(error.error.message)
        }
      }
    );
  }

}
