import { AuthnticationsService } from './../../Services/authntications/authntications.service';
import { Component } from '@angular/core';
import { Doctorinfos } from '../../interfaces/doctorinfos';
import { DoctorService } from '../../Services/doctor/doctor.service';
import { NavbarDoctorComponent } from "../navbar-doctor/navbar-doctor.component";
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [NavbarDoctorComponent,RouterLink,ReactiveFormsModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent {

  
  constructor(private toastr: ToastrService,private _DoctorService:DoctorService,private _AuthnticationsService:AuthnticationsService,private _Router:Router){}
  doctorinfos!:Doctorinfos

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.doctorInformations()
  }

  changepassword:FormGroup=new FormGroup({
    currentPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
    newPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
  })





  changePassword()
  {
    this._AuthnticationsService.changepassword(this.changepassword.value).subscribe({
      next: (response) => 
        {
          console.log(response);
          this.toastr.success('تم تحديث كلمة المرور بنجاح');
          
          
        },
        error: (error) =>
          {
            this.toastr.error(error.error.message);
          }
      
    })
  }

doctorInformations()
{
  this._DoctorService.getDoctor().subscribe({
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

}
