import { spec } from 'node:test/reporters';
import { Component, signal, Signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SpecialitiesService } from '../../Services/specialities/specialities.service';
import { Clinic } from '../../interfaces/clinic';
import { NavbarClientComponent } from "../../Additions/navbar-client/navbar-client.component";
import { ToastrService } from 'ngx-toastr';
import { NavbarClientNotloginComponent } from "../../Additions/navbar-client-notlogin/navbar-client-notlogin.component";
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-clinics-patient',
  standalone: true,
  imports: [NavbarClientComponent, RouterLink, NavbarClientNotloginComponent,FormsModule],
  templateUrl: './clinics-patient.component.html',
  styleUrl: './clinics-patient.component.css'
})
export class ClinicsPatientComponent {
  constructor(private route:ActivatedRoute,private _SpecialitiesService:SpecialitiesService,private toastr: ToastrService,private _Router: Router) { }
  Clinics:Clinic[]=[]
  Filtration:Clinic[]=[]
  ClinicId:any=''
  isLogin:boolean=false
  showMessage=signal(false);

  dropdownOpen = false;

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

  searchTerm: string = '';
  

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ClinicId=this.route.snapshot.paramMap.get('id')
    console.log(this.ClinicId);
    this.getSpecClinics();
    console.log(this.showMessage());
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('page', `/Clinics-Patient/${this.ClinicId}`);
    }
    
  }

    getSpecClinics()
  {
    if(localStorage.getItem('token')!=null)
      {
        this.isLogin=true
        
      }
      this._SpecialitiesService.getClinicBySpeciality(this.ClinicId).subscribe({
        next: (response) => 
          {
            console.log(response);
            this.Clinics = response;
            this.Filtration = response;
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
    this.toastr.success('تم تسجيل الخروج بنجاح');
    localStorage.clear();

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
