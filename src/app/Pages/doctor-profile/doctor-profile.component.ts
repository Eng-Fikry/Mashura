import { spec } from 'node:test/reporters';
import { Component, ElementRef, HostListener, ViewChild, viewChild } from '@angular/core';
import { Specialities } from '../../interfaces/specialities';
import { SpecialitiesService } from '../../Services/specialities/specialities.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { DoctorService } from '../../Services/doctor/doctor.service';
import { Doctorinfos } from '../../interfaces/doctorinfos';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.css'
})
export class DoctorProfileComponent {
  constructor(private toastr: ToastrService,private _Router:Router,private _SpecialitiesService:SpecialitiesService,private _DoctorService:DoctorService){}
  spec:Specialities[]=[];
  doctor!:Doctorinfos
  selectedFile: File | null = null;

  
  @ViewChild('firstName') firstName!: ElementRef;
  @ViewChild('lastName') lastName!: ElementRef;
  @ViewChild('phoneNumber') phoneNumber!: ElementRef;
  @ViewChild('email') email!: ElementRef;

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.selectedFile = file;
      this.doctorForm.get('profilePicture')?.setErrors(null);
    }
  }


  ngOnInit()
  {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('page', '/doctorprofile');
    }
    this.getSpecialities();
    this.getDoctorInfos();
  }

  public doctorForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    specialtyId: new FormControl('', [Validators.required]),
    profilePicture: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  


  submit() {
    this.doctorForm.patchValue({
      firstName: this.firstName.nativeElement.value,
      lastName: this.lastName.nativeElement.value,
      phoneNumber: this.phoneNumber.nativeElement.value,
      email: this.email.nativeElement.value
    });
  
    const formData = new FormData();
    formData.append('firstName', this.doctorForm.get('firstName')?.value);
    formData.append('lastName', this.doctorForm.get('lastName')?.value);
    formData.append('specialtyId', this.doctorForm.get('specialtyId')?.value);
    formData.append('phoneNumber', this.doctorForm.get('phoneNumber')?.value);
    formData.append('email', this.doctorForm.get('email')?.value);
  
    if (this.selectedFile) {
      console.log(this.selectedFile);
      formData.append('profilePicture', this.selectedFile);
    }
  
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    console.log(formData);
  
    this._DoctorService.updateDoctor(formData).subscribe({
      next: (response) => {
        this._Router.navigate(['/Home']);
        this.toastr.success('تم اضافة بياناتك بنجاح');
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message);
      }
    })
  }

getDoctorInfos()
{
  this._DoctorService.getDoctor().subscribe({
    next: (response) => {
      this.doctor=response;
      localStorage.setItem("id2",response.id);
      localStorage.setItem("speciality",response.specialtyId);
    },
    error: (error) => {
      console.log(error);
    }
  })
}


getSpecialities()
{
  this._SpecialitiesService.getSpecialities().subscribe({
    next: (response) => {
      console.log(response);
      this.spec=response;
    },
    error: (error) => {
      console.log(error);
    }
  });

}

}



