import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavbarDoctorComponent } from "../../Additions/navbar-doctor/navbar-doctor.component";
import { DoctorService } from '../../Services/doctor/doctor.service';
import { Doctorinfos } from '../../interfaces/doctorinfos';
import { spec } from 'node:test/reporters';
import { SpecialitiesService } from '../../Services/specialities/specialities.service';
import { Specialities } from '../../interfaces/specialities';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarDoctorComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public doctorinfos!:Doctorinfos
  public spec:Specialities[]=[]
  constructor(private _DoctorService:DoctorService,private _SpecialitiesService:SpecialitiesService) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('page', '/Home');
    }
    
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.doctorInformations();
    this.specs();
    this.preloadImages();
  }

doctorInformations()
{
  this._DoctorService.getDoctor().subscribe({
    next: (response) => 
      {
        console.log(response);
        this.doctorinfos=response;
        localStorage.setItem("id2",response.id);
        localStorage.setItem("speciality",response.specialtyId);

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

specClinics(id:number)
{

}





@ViewChild('mainSection') mainSection!: ElementRef;

  images: string[] = [
    'assets/images/solen-feyissa-jGmBZypoFPc-unsplash.webp',
    'assets/images/elderly-doctor-helping-young-colleague-with-work.webp',
    'assets/images/young-woman-suffering-breast-cancer-talking-with-her-doctor.webp',
    'assets/images/1.jpg',
    'assets/images/2.jpg',
    'assets/images/3.jpg',
  ];

  index = 0;

  ngAfterViewInit(): void {
    this.changeBackground();
    setInterval(() => this.changeBackground(), 4000); // كل 4 ثواني أفضل
  }
  
  changeBackground(): void {
    const imageUrl = ` url('${this.images[this.index]}')`;
    this.mainSection.nativeElement.style.backgroundImage = imageUrl;
    this.mainSection.nativeElement.style.backgroundSize = "cover";
    this.mainSection.nativeElement.style.backgroundPosition = "center";
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
