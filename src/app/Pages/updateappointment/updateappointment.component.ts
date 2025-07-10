import { Component } from '@angular/core';
import { ClinicService } from '../../Services/clinic/clinic.service';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from '../../Services/appointment/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../Services/doctor/doctor.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AvailableAppointment } from '../../interfaces/availableappointment';
import { Clinic } from '../../interfaces/clinic';
import { NavbarClientComponent } from "../../Additions/navbar-client/navbar-client.component";

@Component({
  selector: 'app-updateappointment',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarClientComponent],
  templateUrl: './updateappointment.component.html',
  styleUrl: './updateappointment.component.css'
})
export class UpdateappointmentComponent {
    constructor(private _ClinicService:ClinicService,private toastr: ToastrService,private _Router: Router,private _AppointmentService:AppointmentService,private _ActivatedRoute:ActivatedRoute,private _DoctorService:DoctorService) { }

    currentDate!: string;
      selectedDay: string | null = null;
      errorDate: string | null = null;
      docid: number = Number(this._ActivatedRoute.snapshot.paramMap.get('idDoctor'));
      clinid: number = Number(this._ActivatedRoute.snapshot.paramMap.get('idClinic'));
      appointmentId: number = Number(this._ActivatedRoute.snapshot.paramMap.get('appointmentId'));
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
          sessionStorage.setItem('page', `/updateappointment/${this.clinid}/${this.docid}${this.appointmentId}`);
        }
        
        const today = new Date();
        this.currentDate = today.toISOString().split('T')[0];
        
        this.getClinicById()
      }
    
    
      submit()
      {
        console.log(this.appointmentForm.value);
        this._AppointmentService.updateAppointment(this.appointmentId,this.appointmentForm.value).subscribe({
          next: (response) => {
            console.log(response);
            this._Router.navigate(['/HomeClient']);
            this.toastr.success('تم تعديل بنجاح');
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
    
    
    
      checkWeekend(event: any) {
        const selectedDate = new Date(event.target.value);
        const day = selectedDate.getDay(); 
        const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
        const year = (selectedDate.getFullYear() + 1).toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        this.errorDate = null;
        console.log(formattedDate);
        this.checkAvailability(formattedDate)
    
        if (day === 5 || day === 4) {
          this.errorDate = 'لا يمكنك الحجز في ايام الخميس والجمعة';
          // this.appointmentForm.get('dayOfWeek')?.setValue('');  
        }
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
      formatTimeAMPM(date: Date): string {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 => 12
        const minutesStr = minutes.toString().padStart(2, '0');
        return `${hours}:${minutesStr} ${ampm}`;
      }
    
      generateTimeSlots(start: string, end: string, stepMinutes: number): string[] {
        const times: string[] = [];
        const [startHours, startMinutes] = start.split(':').map(Number);
        const [endHours, endMinutes] = end.split(':').map(Number);
      
        let current = new Date();
        current.setHours(startHours, startMinutes, 0, 0);
      
        const endTime = new Date();
        endTime.setHours(endHours, endMinutes, 0, 0);
      
        while (current <= endTime) {
          times.push(this.formatTimeAMPM(new Date(current)));
          current.setMinutes(current.getMinutes() + stepMinutes);
        }
      
        return times;
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
      
            // فلترة الأوقات المتاحة فقط (الموجودة في الـ availableAppointments)
            this.times = generatedTimes.filter(time =>
              this.availableAppointments.some(app => app.time === time)
            );
      
            console.log("Available Time Slots:", this.times);
          },
          error: (error) => {
            console.log(error);
          }
        });
      }

}
