import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DoctorService } from '../../Services/doctor/doctor.service';
import { Doctorinfos } from '../../interfaces/doctorinfos';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar-doctor',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar-doctor.component.html',
  styleUrl: './navbar-doctor.component.css'
})
export class NavbarDoctorComponent {
  constructor(private toastr: ToastrService,private _Router:Router,private _DoctorService:DoctorService) { }
    public doctorinfos!:Doctorinfos
    isDropdownOpen = false;

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}
  

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.doctorInformations();
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
  logout()
  {
    this._Router.navigate(['/Login']);
    localStorage.clear();
    this.toastr.success('تم تسجيل الخروج بنجاح');

  }

}
