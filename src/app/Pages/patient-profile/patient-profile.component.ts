import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../../Services/patient/patient.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Patient } from '../../interfaces/patient';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.css'
})
export class PatientProfileComponent {
  constructor(private toastr: ToastrService,private _Router:Router,private _PatientService:PatientService) { }

  patient!:Patient
  @ViewChild('firstName') firstName!: ElementRef;
  @ViewChild('lastName') lastName!: ElementRef;
  @ViewChild('phoneNumber') phoneNumber!: ElementRef;
  @ViewChild('email') email!: ElementRef;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('page', '/patientprofile');
    }
    
    this.getPatientInfos()
    
  }

  public patientForm: FormGroup = new FormGroup({
      firstName: new FormControl('', ),
      lastName: new FormControl('', ),
      email: new FormControl('', [ Validators.email]),
      phoneNumber: new FormControl('', [ Validators.pattern(/^\d{11}$/)]),
      gender: new FormControl('', [Validators.required]),
      address: new FormControl('', Validators.required),
    });

    submit()
  {
    this.patientForm.value.firstName=this.firstName.nativeElement.value ;
    this.patientForm.value.lastname=this.lastName.nativeElement.value ;
    this.patientForm.value.phoneNumber=this.phoneNumber.nativeElement.value ;
    this.patientForm.value.email=this.email.nativeElement.value ;
    console.log(this.patientForm.value);
    this._PatientService.updatePatient(this.patientForm.value).subscribe({
      next: (response) => {
        this._Router.navigate(['/HomeClient']);
        this.toastr.success('تم اضافة بياناتك بنجاح');
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.message);
      }
    })
  }

  getPatientInfos()
  {
    this._PatientService.getPatient().subscribe({
      next: (response) => {
      this.patient=response;
      localStorage.setItem("id2",response.id);
      console.log(this.patient);
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

}
