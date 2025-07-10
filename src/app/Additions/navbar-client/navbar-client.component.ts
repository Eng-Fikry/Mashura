import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from '../../Services/patient/patient.service';
import { Patient } from '../../interfaces/patient';

@Component({
  selector: 'app-navbar-client',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar-client.component.html',
  styleUrl: './navbar-client.component.css'
})
export class NavbarClientComponent {
  constructor(private toastr: ToastrService,private _Router:Router,private _PatientService:PatientService) { }
    public patient!:Patient
      isDropdownOpen = false;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.patientInformations();
  }
  toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}
  logout()
  {
    this._Router.navigate(['/Login']);
    this.toastr.success('تم تسجيل الخروج بنجاح');
    localStorage.clear();

  }
  patientInformations()
{
  this._PatientService.getPatient().subscribe({
    next: (response) => 
      {
        localStorage.setItem("id2",response.id);
        console.log(response);
        this.patient=response;
      },
      error: (error) =>
        {
          console.log(error); 
        }
    
  })

}

}
