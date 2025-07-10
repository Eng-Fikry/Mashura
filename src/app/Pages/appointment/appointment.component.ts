import { Component } from '@angular/core';
import { NavbarClientComponent } from "../../Additions/navbar-client/navbar-client.component";
import { NavbarDoctorComponent } from "../../Additions/navbar-doctor/navbar-doctor.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../Services/appointment/appointment.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DoctorService } from '../../Services/doctor/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { ClinicService } from '../../Services/clinic/clinic.service';
import { Clinic } from '../../interfaces/clinic';
import { AvailableAppointment } from '../../interfaces/availableappointment';

//Pending,
//Confirmed,
//Rescheduled,
//Cancelled,
//Completed

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [NavbarClientComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
  constructor(private _ClinicService:ClinicService,private toastr: ToastrService,private _Router: Router,private _AppointmentService:AppointmentService,private _ActivatedRoute:ActivatedRoute,private _DoctorService:DoctorService) { }
  currentDate!: string;
  selectedDay: string | null = null;
  errorDate: string | null = null;
  docid: number = Number(this._ActivatedRoute.snapshot.paramMap.get('idDoctor'));
  clinid: number = Number(this._ActivatedRoute.snapshot.paramMap.get('idClinic'));
  availableAppointments: AvailableAppointment[] = [];
  Clinic!: Clinic
  days:string[]=[]
  times:string[]=[]


  appointmentForm = new FormGroup({
    doctorId: new FormControl(this.docid, Validators.required),
    patientId: new FormControl(Number(localStorage.getItem('id2')), Validators.required),
    clinicId: new FormControl(this.clinid, Validators.required),
    dayOfWeek: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    status: new FormControl('Confirmed', Validators.required),
  });
  clienttime=this.appointmentForm.get('time');
  clientdate=this.appointmentForm.get('date');


  ngOnInit()
  {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('page', `/appointment/${this.clinid}/${this.docid}`);
    }
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
    
    this.getClinicById()
  }


  submit()
  {
    console.log(this.appointmentForm.value);
    this._AppointmentService.createAppointment(this.appointmentForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this._Router.navigate([`/application/${this.clinid}/${this.docid}/${response.id}`]);
        this.toastr.success('تم طلب الموعد بنجاح');
      },
      error: (error) => {
        console.log(error.message);
        this.toastr.error("تاكد من ملئ جميع الحقول بشكل صحيح");
      }
    })
  }





  checkAvailability(date: string) {
    console.log(date);
    this._DoctorService.getDoctorAvailableAppointments(date,this.docid).subscribe({
      next: (response) => {
        console.log(response);
        this.availableAppointments = response;
      }
      ,
      error: (error) => {
        console.log(error);
      }
    });
  }





  getClinicById() {
    this._ClinicService.getClinicById(this.clinid).subscribe({
      next: (response) => {
        console.log(response);
        this.Clinic=response;
        for (let i = 0; i < this.Clinic.days.length; i++) 
        {
          this.days[i]=response.days[i].dayOfWeek;
          console.log(this.days);
          
        }

      }
      ,
      error: (error) => {
        console.log(error);
      }
    });
  }

// generateTimeSlots(start:any, end:any, stepMinutes:any) {
//     const times = [];
//     const [startHours, startMinutes] = start.split(':').map(Number);
//     const [endHours, endMinutes] = end.split(':').map(Number);
  
//     let current = new Date();
//     current.setHours(startHours, startMinutes, 0, 0);
  
//     const endTime = new Date();
//     endTime.setHours(endHours, endMinutes, 0, 0);
  
//     while (current <= endTime) {
//       const hours = String(current.getHours()).padStart(2, '0');
//       const minutes = String(current.getMinutes()).padStart(2, '0');
//       times.push(`${hours}:${minutes}`);
//       current.setMinutes(current.getMinutes() + stepMinutes);
//     }
//     this.times=times
  
//     console.log(times);
//     return times;
//   }
  // selectDay(event: any) {

  //   const selectElement = event.target as HTMLSelectElement;
  //   const selectedOption = selectElement.selectedOptions[0]; // نحصل على الخيار المختار
  //   this.selectedDay = selectElement.value;

  //   let index = selectedOption.getAttribute('data-id');
  //   let index2=0
  //   if(index!=null)
  //     {
  //       index2=Number(index);
  //     }
    

    
  //   this._DoctorService.getDoctorAvailableAppointments(this.selectedDay,this.docid).subscribe({
  //     next: (response) => {
  //       this.availableAppointments = response;
  //       console.log(this.times);
  //       console.log(this.availableAppointments)
  //       this.generateTimeSlots(this.Clinic.days[index2].startTime, this.Clinic.days[index2].endTime, this.Clinic.visitDuration);
  //       console.log(this.times);


  //       this.times = this.times.filter(time =>
  //         this.availableAppointments.some(app => app.time === time)
  //       );
  //       console.log(this.times);
  //       console.log(this.availableAppointments)


  //     }
  //     ,
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   })
  // }
generateTimeSlots(start: string, end: string, stepMinutes: number): string[] {
  console.log("Start:", start);
  console.log("End:", end);
  console.log("Step Minutes:", stepMinutes);

  const times: string[] = [];

  // التحقق من أن تنسيق الوقت صحيح قبل استخدامه
  const [startHours, startMinutes] = this.parseTime(start);
  const [endHours, endMinutes] = this.parseTime(end);

  console.log("Parsed Start Hours:", startHours, "Parsed Start Minutes:", startMinutes);
  console.log("Parsed End Hours:", endHours, "Parsed End Minutes:", endMinutes);

  let current = new Date();
  current.setHours(startHours, startMinutes, 0, 0);

  const endTime = new Date();
  endTime.setHours(endHours, endMinutes, 0, 0);

  while (current <= endTime) {
    times.push(this.formatTimeAMPM(new Date(current)));
    current.setMinutes(current.getMinutes() + stepMinutes);
  }

  console.log("Generated Time Slots:", times);
  return times;
}

// دالة لتحليل الوقت والتأكد من صيغة "HH:mm"
private parseTime(time: string): [number, number] {
  if (!time || !/^\d{2}:\d{2} (AM|PM)$/.test(time)) {
    console.error("Invalid time format received:", time);
    return [0, 0]; // العودة لوقت افتراضي في حالة عدم صلاحية التنسيق
  }
  
  const [timePart, ampm] = time.split(' ');
  const [hours, minutes] = timePart.split(':').map(Number);
  
  let adjustedHours = hours;
  if (ampm === "PM" && hours < 12) adjustedHours += 12; // إضافة 12 ساعة للمواعيد PM
  if (ampm === "AM" && hours === 12) adjustedHours = 0; // تحويل 12 AM إلى 0

  return [adjustedHours, minutes];
}

// تعديل دالة تنسيق الوقت لتكون بتنسيق "hh:mm AM/PM"
formatTimeAMPM(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 => 12
  const minutesStr = minutes.toString().padStart(2, "0");
  if(hours>=10)
    {
      return `${hours}:${minutesStr} ${ampm}`;
    }
  return `0${hours}:${minutesStr} ${ampm}`;
}

  
  selectDay(event: any) {
  const selectElement = event.target as HTMLSelectElement;
  this.selectedDay = selectElement.value;
  const index = Number(selectElement.selectedOptions[0]?.getAttribute('data-id') || 0);

  const dayDetails = this.Clinic.days[index];
  const { startTime, endTime } = dayDetails;

  this._DoctorService.getDoctorAvailableAppointments(this.selectedDay, this.docid).subscribe({
    next: (response) => {
      this.availableAppointments = response;

      // توليد الأوقات بناء على المدة من الـ Clinic
      const generatedTimes = this.generateTimeSlots(startTime, endTime, this.Clinic.visitDuration);
      console.log("Generated Times:", generatedTimes);
      console.log("Available Appointments:", this.availableAppointments);
      this.times = generatedTimes;
      //  فلترة الأوقات المتاحة فقط (الموجودة في الـ availableAppointments)
       this.times = generatedTimes.filter(time =>
      this.availableAppointments.some(app => app.time == time)
      );
      console.log("Filtered Available Time Slots:", this.times);
    },
    error: (error) => {
      console.log("Error:", error);
    }
  });
}


  
  back()
  {
    
  }

}
