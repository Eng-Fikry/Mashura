import { Component, signal, Type } from '@angular/core';
import { NavbarClientComponent } from "../../Additions/navbar-client/navbar-client.component";
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../Services/doctor/doctor.service';
import { PatientService } from '../../Services/patient/patient.service';
import { AppointmentService } from '../../Services/appointment/appointment.service';
import { AppointmentForm, AppointmentForm2 } from '../../interfaces/appointment-form';
import { RouterLink } from '@angular/router';
import { Doctorinfos, Full } from '../../interfaces/doctorinfos';
import { forkJoin } from 'rxjs';
import { ClinicService } from '../../Services/clinic/clinic.service';
import { Clinic } from '../../interfaces/clinic';

@Component({
  selector: 'app-patientappointments',
  standalone: true,
  imports: [NavbarClientComponent, RouterLink],
  templateUrl: './patientappointments.component.html',
  styleUrl: './patientappointments.component.css'
})
export class PatientappointmentsComponent {
  constructor(
    private toaster: ToastrService,
    private _ClinicService: ClinicService,
    private _DoctorService: DoctorService,
    private _PatientService: PatientService,
    private _AppointmentService: AppointmentService
  ) { }

  patientAppointments = signal<AppointmentForm[]>([]);
  DoneAppointments = signal<AppointmentForm[]>([]);
  ConfirmedAppointments = signal<AppointmentForm[]>([]);
  doctorInfos: Doctorinfos[] = [];
  clinicInfos: Clinic[] = [];
  full = signal<Full[]>([]); 
  
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('page', '/patientappointments');
    }

    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    this.getAppointments();
  }

  getAppointments() {
    this._AppointmentService.getAppointmentsByPatientId().subscribe({
      next: (response) => {
        this.patientAppointments.set(response);
        this.DoneAppointments.set(this.patientAppointments().filter(x => x.status == 'Completed'));
        this.ConfirmedAppointments.set(this.patientAppointments().filter(x => x.status == 'Confirmed'));

        let doctorRequests = this.patientAppointments().map(app =>
          this._DoctorService.getDoctorid(app.doctorId)
        );
        console.log(doctorRequests);

        forkJoin(doctorRequests).subscribe({
          next: (doctors) => {
            this.doctorInfos = doctors;

            this.full.set(this.patientAppointments().map((item, index) => ({
              ...item,
              ...doctors[index]
            })));

            let clinicRequests = this.full().map(app =>
              this._ClinicService.getClinicById(app.clinicId)
            );
            forkJoin(clinicRequests).subscribe({
              next: (cli) => {
                this.clinicInfos = cli;
                this.full.set(this.full().map((item, index) => ({
                  ...item,
                  ...cli[index]
                })));
                console.log("Merged Full:", this.full());
              },
              error: (error) => {
                this.toaster.error("Error fetching doctor data");
              }
            });

          },
          error: (error) => {
            this.toaster.error("Error fetching doctor data");
          }
        });

      },
      error: (error) => {
        this.toaster.error("لم تقم بحجز اي عيادة");
      }
    });
  }

  ignore(id: number) {
    console.log(id);
    this._AppointmentService.deleteAppointment(id).subscribe(
      {
        next: (response) => {
          this.getAppointments();
          this.toaster.success("لقد تم الغاء الموعد بنجاح");
        },
        error: (error) => {
          this.toaster.error(error.message);
        }
      }
    );
  }

  getClinicInfos(id: number) {
    this._ClinicService.getClinicById(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
