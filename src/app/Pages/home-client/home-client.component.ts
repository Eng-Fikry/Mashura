import { Component, ElementRef, ViewChild } from '@angular/core';
import { Doctorinfos } from '../../interfaces/doctorinfos';
import { SpecialitiesService } from '../../Services/specialities/specialities.service';
import { Specialities } from '../../interfaces/specialities';
import { RouterLink } from '@angular/router';
import { NavbarClientComponent } from "../../Additions/navbar-client/navbar-client.component";
import { PatientService } from '../../Services/patient/patient.service';
import { Patient } from '../../interfaces/patient';
import { NavbarClientNotloginComponent } from "../../Additions/navbar-client-notlogin/navbar-client-notlogin.component";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home-client',
  standalone: true,
  imports: [NavbarClientComponent, RouterLink, NavbarClientNotloginComponent],
  templateUrl: './home-client.component.html',
  styleUrl: './home-client.component.css'
})
export class HomeClientComponent {
  public patient!:Patient
  public spec:Specialities[]=[]
  isLogin:boolean=false
  constructor(private _PatientService:PatientService,private _SpecialitiesService:SpecialitiesService,private _NgxSpinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('page', '/HomeClient');
    }
    
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.preloadImages();
    this.patientInformations();
    this.specs();
    if(localStorage.getItem('token')!=null)
    {
      this.isLogin=true;
    }
    
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

specs()
{
  this._SpecialitiesService.getSpecialities().subscribe({
    next: (response) => 
      {
        console.log(response);
        this.spec=response;
      },
      error: (error) =>
        {
          console.log(error); 
        }
  })
}





@ViewChild('mainSection') mainSection!: ElementRef;

  images: string[] = [
    'assets/images/solen-feyissa-jGmBZypoFPc-unsplash.webp',
    'assets/images/elderly-doctor-helping-young-colleague-with-work.webp',
    'assets/images/young-woman-suffering-breast-cancer-talking-with-her-doctor.webp'
  ];

  index = 0;

  ngAfterViewInit(): void {
    this.changeBackground(); // Start immediately
    setInterval(() => this.changeBackground(), 3000); // Change every 3 seconds
  }

  changeBackground(): void {
    const imageUrl = `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('${this.images[this.index]}')`;
    this.mainSection.nativeElement.style.backgroundImage = imageUrl;

    this.index = (this.index + 1) % this.images.length;
  }

 
  preloadImages() {
    this.images.forEach((imgSrc) => {
      const img = new Image();
      img.src = imgSrc;
    });
  }
  scrollToSection(): void {
    const element = document.getElementById('spec');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }


}
