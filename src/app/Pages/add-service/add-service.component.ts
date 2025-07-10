import { Day } from './../../interfaces/day';
import { spec } from 'node:test/reporters';
import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { NavbarComponent } from "../../Additions/navbar/navbar.component";
import { NavbarDoctorComponent } from "../../Additions/navbar-doctor/navbar-doctor.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClinicService } from '../../Services/clinic/clinic.service';
import { SpecialitiesService } from '../../Services/specialities/specialities.service';
import { Specialities } from '../../interfaces/specialities';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-service',
  standalone: true,
  imports: [NavbarDoctorComponent,ReactiveFormsModule,FormsModule],
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css'
})
export class AddServiceComponent {
  constructor(private toastr: ToastrService,private _Router:Router,private _ClinicService:ClinicService) { }


  lat: number | null = null;
  lng: number | null = null;
  selectedLat: number | null = null;
  selectedLng: number | null = null;
  private map: any;
  private marker: any;
  availableDays: string[] = [    "السبت",
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
}

  async ngAfterViewInit() {
    if (typeof window === 'undefined') return;
  
    const L = await import('leaflet');
  
    // تعيين الأيقونة يدويًا
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '../assets/images/marker-icon-2x.png',
      // iconUrl: '../assets/images/marker-icon-2x.png',
      shadowUrl: '../assets/images/marker-shadow.png',
    
      iconSize: [60, 60],       // الحجم الفعلي للأيقونة
      iconAnchor: [12, 41],     // النقطة التي ترتكز عليها الأيقونة على الخريطة (أسفل المركز)
      popupAnchor: [1, -34],    // موضع ظهور الـ popup بالنسبة للأيقونة
      tooltipAnchor: [16, -28], // موضع ظهور الـ tooltip
      shadowSize: [2, 2]      // حجم الظل
    });
  
    // إنشاء الخريطة بمكان مبدئي مؤقت
    this.map = L.map('map').setView([30.033333, 31.233334], 13);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  
    // الحصول على موقع المستخدم
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




  doctorId!:number
  specialtyId!:number
  selectedFile: File | null = null;


  onFileSelected(event: any) {
    const file = event.target.files[0];
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
    Logo: new FormControl('',[Validators.required]),
    // Days: new FormControl(this.days),
    
  })

submit()
{

  this.clinic.get('Latitude')?.setValue(this.lat);
  this.clinic.get('Longitude')?.setValue(this.lng);
  
  this.clinic.get('DoctorId')?.setValue(parseInt(localStorage.getItem('id2')!, 10))
  this.clinic.get('SpecialtyId')?.setValue(parseInt(localStorage.getItem('speciality')!, 10))
  // console.log(this.clinic.value);

  // const formData = new FormData();
  //   formData.append('name', this.clinic.get('name')?.value);
  //   formData.append('address', this.clinic.get('address')?.value);
  //   formData.append('price', this.clinic.get('price')?.value);
  //   formData.append('doctorId', this.doctorId.toString());
  //   formData.append('specialtyId', this.specialtyId.toString());
  //   formData.append('visitDuration', this.clinic.get('visitDuration')?.value);
  //   formData.append('latitude', this.clinic.get('latitude')?.value);
  //   formData.append('longitude', this.clinic.get('longitude')?.value);
  //   formData.append('days', this.clinic.get('days')?.value);
  //   if (this.selectedFile) {
  //     console.log(this.selectedFile);
  //     formData.append('logo', this.selectedFile);
  //   }
    // formData.forEach((value, key) => {
    //   console.log(`${key}:`, value);
    // });
    // console.log(formData);


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
    if (this.selectedFile) {
      formData.append('Logo', this.selectedFile, this.selectedFile.name);
    }  
    for(let i=0;i<this.days.length;i++)
    {
      formData.append(`Days[${i}].DayOfWeek`, this.days[i].dayOfWeek);
      formData.append(`Days[${i}].StartTime`, this.days[i].startTime);
      formData.append(`Days[${i}].EndTime`, this.days[i].endTime);

    }
  
    // طباعة محتويات الفورم داتا
    formData.forEach((value, key) => {
      console.log(key, ':', value);
    });
  
    // إرسال باستخدام HttpClient
   

// المرور على كل عناصر الفورم


  this._ClinicService.addClinic(formData).subscribe({
    next: (response) => {
      this.toastr.success('تم اضافة العيادة بنجاح');
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

    // Reset values if needed
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
