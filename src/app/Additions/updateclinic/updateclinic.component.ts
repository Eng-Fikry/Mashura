import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Day } from '../../interfaces/day';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicService } from '../../Services/clinic/clinic.service';
import e from 'express';
import { Clinic } from '../../interfaces/clinic';
import { NavbarDoctorComponent } from "../navbar-doctor/navbar-doctor.component";

@Component({
  selector: 'app-updateclinic',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarDoctorComponent],
  templateUrl: './updateclinic.component.html',
  styleUrl: './updateclinic.component.css'
})
export class UpdateclinicComponent {


   constructor(private toastr: ToastrService,private _Router:Router,private _ClinicService:ClinicService,private _ActivatedRoute:ActivatedRoute) { }
    doctorId!:number
    specialtyId!:number
    selectedFile: File | null = null;
    clinicid: number = Number(this._ActivatedRoute.snapshot.paramMap.get('id'));
    clincicdata!:Clinic
    lat: number | null = null;
    lng: number | null = null;
    selectedLat: number | null = null;
    selectedLng: number | null = null;
    private map: any;
    private marker: any;
    imageUrl!: string | File ;
    availableDays: string[] = [ "السبت",
      "الأحد",
      "الأثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعه"]
    availableHours:string[]=[];
    minutesArray: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'];
    HourArrayFrom: string[] = [
      "01:00 AM", "01:30 AM", "02:00 AM", "02:30 AM", "03:00 AM", "03:30 AM",
      "04:00 AM", "04:30 AM", "05:00 AM", "05:30 AM", "06:00 AM", "06:30 AM",
      "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
      "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
      "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
      "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
      "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM",
      "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM", "12:00 AM"
    ];
    
    HourArrayTo:string[]=[]
    day!:Day
    days: Day[] = [];
    @ViewChild('youm') youmRef!: ElementRef<HTMLSelectElement>;
    @ViewChild('from') fromRef!: ElementRef<HTMLSelectElement>;
    @ViewChild('to') toRef!: ElementRef<HTMLSelectElement>;
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
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('page', `/addservice`);
    }
    this.getClinic();
    

  }

  getClinic(){
    this._ClinicService.getClinicById(this.clinicid).subscribe({

      next:(response)=>{
        this.clincicdata=response
        this.days=response.days
        console.log(this.clincicdata);
        this.availableDays = this.availableDays.filter(
        day => !this.days.find(dayy => dayy.dayOfWeek === day)
        );    
        this.imageUrl="http://graduationproject2025.runasp.net"+this.clincicdata.logo    
        this.clinic.patchValue({
        VisitDuration: this.clincicdata.visitDuration,
        Name: this.clincicdata.name,
        Address: this.clincicdata.address,
        Government: this.clincicdata.government,
        Price: this.clincicdata.price,
});

      }

    })
  }
    async ngAfterViewInit() {
      if (typeof window === 'undefined') return;
    
      const L = await import('leaflet');
    
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '../assets/images/marker-icon-2x.png',
        shadowUrl: '../assets/images/marker-shadow.png',
      
        iconSize: [60, 60],      
        iconAnchor: [12, 41],    
        popupAnchor: [1, -34],    
        tooltipAnchor: [16, -28], 
        shadowSize: [2, 2]     
      });
    
      this.map = L.map('map').setView([30.033333, 31.233334], 13);
    
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);
    
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.lat = latitude;
            this.lng = longitude;
    
            this.map.setView([latitude, longitude], 13);
    
            this.marker = L.marker([latitude, longitude], { draggable: true }).addTo(this.map);
    
            this.marker.on('dragend', () => {
              const pos = this.marker.getLatLng();
              this.lat = pos.lat;
              this.lng = pos.lng;
              this.selectedLat = pos.lat;
              this.selectedLng = pos.lng;
            });
          },
          (error) => {
            console.error('Error getting location', error);
            this.map.setView([30.033333, 31.233334], 13);
          }
        );
      }
    
      // كليك لتحديد الموقع الجديد
      this.map.on('click', (e: any) => {
        const { lat, lng } = e.latlng;
        this.lat = lat;
        this.lng = lng;
        this.selectedLat = lat;
        this.selectedLng = lng;
    
        if (this.marker) {
          this.marker.setLatLng([lat, lng]);
        } else {
          this.marker = L.marker([lat, lng], { draggable: true }).addTo(this.map);
        }
      });
    } 
  
    onFileSelected(event: any) {
      console.log(event);
      let file = event.target.files[0];
       file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.clinic.get('Logo')?.setValue(file);
      }
    }
  
  
  
    clinic:FormGroup=new FormGroup({
  
      Name: new FormControl('',[Validators.required]),
      Address: new FormControl('',[Validators.required]),
      Government:new FormControl('',[Validators.required]),
      Price: new FormControl('',[Validators.required,Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]),
      DoctorId: new FormControl(''),
      SpecialtyId: new FormControl(''),
      VisitDuration: new FormControl('',[Validators.required]),
      Latitude: new FormControl(this.lat),
      Longitude: new FormControl(this.lng),
      Logo: new FormControl(``,[Validators.required]),
      // Days: new FormControl(this.days),
      
    })
  
  submit()
  {
        // this.clinic.get('Logo')?.setValue(this.imageUrl);

        console.log(this.clinic.value);
    
    
  
    this.clinic.get('Latitude')?.setValue(this.lat);
    this.clinic.get('Longitude')?.setValue(this.lng);
    
    this.clinic.get('DoctorId')?.setValue(parseInt(localStorage.getItem('id2')!, 10))
    this.clinic.get('SpecialtyId')?.setValue(parseInt(localStorage.getItem('speciality')!, 10))
 
  
  
      const formData = new FormData();
  
      formData.append('Name', this.clinic.get('Name')?.value);
      formData.append('Address', this.clinic.get('Address')?.value);
      formData.append('Price', this.clinic.get('Price')?.value);
      formData.append('Government', this.clinic.get('Government')?.value);
      formData.append('DoctorId', this.clinic.get('DoctorId')?.value);
      formData.append('SpecialtyId', this.clinic.get('SpecialtyId')?.value);
      formData.append('VisitDuration', this.clinic.get('VisitDuration')?.value);
      formData.append('Latitude', this.clinic.get('Latitude')?.value);
      formData.append('Longitude', this.clinic.get('Longitude')?.value);
      formData.append('Logo', this.imageUrl);
      if (this.selectedFile) {
        formData.delete('Logo');
        formData.append('Logo', this.selectedFile, this.selectedFile.name);
      }  
      for(let i=0;i<this.days.length;i++)
      {
        formData.append(`Days[${i}].DayOfWeek`, this.days[i].dayOfWeek);
        formData.append(`Days[${i}].StartTime`, this.days[i].startTime);
        formData.append(`Days[${i}].EndTime`, this.days[i].endTime);
  
      }
    
      formData.forEach((value, key) => {
        console.log(key, ':', value);
      });

  
  
    this._ClinicService.updateClinic(this.clinicid,formData).subscribe({
      next: (response) => {
        this.toastr.success('تم تعديل بيانات العيادة ');
        console.log(response);
        this._Router.navigate(['/Home']);
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message);
      }
    })
  
  }
  
  
  AvilableHoursTo(time: any) {
    const timeValue = time.target.value;
    console.log(timeValue)
    const cut=this.HourArrayFrom.indexOf(timeValue)
    console.log(cut)
    this.HourArrayTo= this.HourArrayFrom.slice(cut+1)
    console.log(this.HourArrayTo)
  
  
  }
  addDay()
  {
    const dayy=  this.youmRef.nativeElement.value
    const hourFrom=  this.fromRef.nativeElement.value
    const hourTo=  this.toRef.nativeElement.value
  
    console.log(dayy);
    console.log(hourFrom);
    console.log(hourTo);
    if (dayy && hourFrom && hourTo) {
      const day: Day = {
        dayOfWeek: dayy,
        startTime: hourFrom,
        endTime: hourTo
      };
      this.days.push(day);
  
      const index = this.availableDays.indexOf(dayy);
      this.availableDays.splice(index, 1);
  
      console.log(this.days);
  }
  else {
    this.toastr.error('يرجى تعبئة جميع الحقول');
  }
  
  }
  removeDay(index: number) {
    this.availableDays.push(this.days[index].dayOfWeek);
    this.days.splice(index, 1);
    console.log(this.days);
    console.log(this.availableDays);
  }

}
