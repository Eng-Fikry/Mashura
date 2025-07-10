import { spec } from 'node:test/reporters';
import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpecialitiesService } from '../../Services/specialities/specialities.service';
import { Clinic } from '../../interfaces/clinic';
import { NavbarDoctorComponent } from "../../Additions/navbar-doctor/navbar-doctor.component";

@Component({
  selector: 'app-clinics',
  standalone: true,
  imports: [NavbarDoctorComponent],
  templateUrl: './clinics.component.html',
  styleUrl: './clinics.component.css'
})
export class ClinicsComponent {
  constructor(private route:ActivatedRoute,private _SpecialitiesService:SpecialitiesService) { }
  Clinics:Clinic[]=[]
  ClinicId:any=''
  dropdownOpen = false;
  showMessage=signal(false);
   Filtration:Clinic[]=[]


  egyptGovernorates: string[] = [
    "القاهرة",
    "الجيزة",
    "الإسكندرية",
    "الدقهلية",
    "البحر الأحمر",
    "البحيرة",
    "الفيوم",
    "الغربية",
    "الإسماعيلية",
    "المنوفية",
    "المنيا",
    "القليوبية",
    "الوادي الجديد",
    "السويس",
    "أسوان",
    "أسيوط",
    "بني سويف",
    "بورسعيد",
    "دمياط",
    "جنوب سيناء",
    "كفر الشيخ",
    "مطروح",
    "الأقصر",
    "قنا",
    "شمال سيناء",
    "سوهاج"
  ];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ClinicId=this.route.snapshot.paramMap.get('id')
    console.log(this.ClinicId);
    this.getSpecClinics();
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('page', `/Clinics/${this.ClinicId}`);
    }
    
  }

  getSpecClinics()
  {
    this._SpecialitiesService.getClinicBySpeciality(this.ClinicId).subscribe({
      next: (response) => 
        {
          console.log(response.days);
          console.log(response);
          this.Clinics=response;
        },
        error: (error) =>
          {
            console.log(error); 
          }
    })
    
  }
    ToggleSignUpMessage()
  {
    if(this.showMessage()==false)
      {
        this.showMessage.set(true);
      }
      else
      {
        this.showMessage.set(false);
      }
    console.log(this.showMessage());
  }
   filtretion(event: any) {
  
    const gov =  event.target.value;
    if(gov=='all')
      {
        this.Filtration = this.Clinics;
      }
  
    else
    {
      this.Filtration =  this.Clinics.filter(x => x.government === gov);
    }
  
    console.log(this.Filtration);
    
  }





  
selectedGovernorate: string | null = null;

toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}

selectGovernorate(value: string) {
  this.selectedGovernorate = value;
  if(this.selectedGovernorate=='عرض الكل')
    {
      this.Filtration = this.Clinics;
    }

  else
  {
    this.Filtration =  this.Clinics.filter(x => x.government === this.selectedGovernorate);
  }
  this.dropdownOpen = false;
  this.filtretion(value); // ← نفذ فلترة أو إجراء مناسب
}

  



}
