import { Component } from '@angular/core';
import { DoctorService } from '../Services/doctor/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { History } from '../interfaces/history';
import { NavbarDoctorComponent } from "../Additions/navbar-doctor/navbar-doctor.component";
import { NavbarClientComponent } from "../Additions/navbar-client/navbar-client.component";

@Component({
  selector: 'app-showhistory',
  standalone: true,
  imports: [NavbarDoctorComponent, NavbarClientComponent],
  templateUrl: './showhistory.component.html',
  styleUrl: './showhistory.component.css'
})
export class ShowhistoryComponent {
  constructor(private _DoctorService:DoctorService,private _ActivatedRoute:ActivatedRoute,private _Router:Router) { }
  id = Number(this._ActivatedRoute.snapshot.paramMap.get('id'))
    role!:string

  history:History[]=[]
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (typeof window !== 'undefined') {
      this.role=localStorage.getItem('role')!;
    }
    console.log(this.role);
    
    this.gethistory();
  }
  gethistory(){
     
    this._DoctorService.gethistory(this.id).subscribe({
      next:(response)=>{
        // console.log(response)
        this.history=response
        console.log(this.history)
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

}
