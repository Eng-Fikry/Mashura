import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../Services/doctor/doctor.service';
import { NavbarDoctorComponent } from "../Additions/navbar-doctor/navbar-doctor.component";
import { ToastrService } from 'ngx-toastr';
import { NavbarClientComponent } from "../Additions/navbar-client/navbar-client.component";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarDoctorComponent, NavbarClientComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {


  constructor(private _ActivatedRoute:ActivatedRoute,private _DoctorService:DoctorService,private _Router:Router,private _ToastrService:ToastrService){}
  patientid=Number(this._ActivatedRoute.snapshot.paramMap.get('id'))
  currentDate = new Date();
  formattedDate = this.currentDate.toISOString().split('T')[0]; // صيغة التاريخ (yyyy-mm-dd)
  formattedTime = this.currentDate.toTimeString().split(' ')[0].substring(0, 5); // صيغة الوقت 

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  appointmentForm:FormGroup=new FormGroup({
    patientId: new FormControl(this.patientid, ),
      visitDate: new FormControl(this.formattedDate, ),
      visitTime: new FormControl(`${this.formattedTime}:00`, ),
      MainComplaint: new FormControl('', ),
      Diagnosis: new FormControl('', ),
      RequiredTests: new FormControl('', ),
      PrescribedTreatment: new FormControl('', ),
      AdditionalNotes: new FormControl('', )
  })

  submit()
  {
    
    console.log(this.appointmentForm.value);
    this._DoctorService.patienthoistory(this.appointmentForm.value).subscribe({
      next:(response)=>{
        console.log(response)
        this._Router.navigate([`/doctorappointments`]);
        this._ToastrService.success(response.message);

      },
      error:(error)=>{
        console.log(error)
      }
    })
  }



}
