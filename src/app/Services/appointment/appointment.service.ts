import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseURL } from '../../base-url';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {


  constructor(private _HttpClient: HttpClient) {}

  // ✅ Check Availability
  checkAvailability(doctorId: number, date: string, time: string): Observable<any> {
    const url = `${BaseURL.base}/CheckAvailability`;
    const params = new HttpParams()
      .set('doctorId', doctorId)
      .set('date', date)
      .set('time', time);
    return this._HttpClient.get(url, { params });
  }

  // ✅ Reschedule Appointment
  rescheduleAppointment(appointmentId: number, date: string, time: string): Observable<any> {
    const url = `${BaseURL.base}/Appointments/Reschedule/${appointmentId}`;
    const params = new HttpParams()
      .set('date', date)
      .set('time', time);
    return this._HttpClient.put(url, null, { params });
  }

  // ✅ Cancel Appointment
  cancelAppointment(appointmentId: number): Observable<any> {
    const url = `${BaseURL.base}/Appointments/Cancel/${appointmentId}`;
    return this._HttpClient.put(url, null);
  }

  // ✅ Delete Appointment
  deleteAppointment(appointmentId: number): Observable<any> {

    const token = localStorage.getItem('token'); 
      
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    const url = `${BaseURL.base}/api/Appointment/${appointmentId}`;
    return this._HttpClient.delete(url, { headers });
  }

  // ✅ Update Appointment
  updateAppointment(appointmentId: number, data: any): Observable<any> {
    const token = localStorage.getItem('token'); 
      
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    const url = `${BaseURL.base}/api/Appointment/${appointmentId}`;
    return this._HttpClient.put(url, data, { headers });
  }

  // ✅ Create Appointment
  createAppointment(data: any): Observable<any> {
    const token = localStorage.getItem('token'); 
      
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    return this._HttpClient.post(`${BaseURL.base}/api/Appointment`, data, { headers });
  }

  // ✅ Get Appointments By Doctor Id
  getAppointmentsByDoctorId(): Observable<any> {
    const id=localStorage.getItem('id2');
    const url = `${BaseURL.base}/api/Appointment/Appointments/doctor/${id}`;
    return this._HttpClient.get(url);
  }

  // ✅ Get Appointments By Patient Id
  getAppointmentsByPatientId(): Observable<any> {
    const id=localStorage.getItem('id2');
    const url = `${BaseURL.base}/api/Appointment/Appointments/patient/${id}`;
    return this._HttpClient.get(url);
  }

  // ✅ Get Appointment By Id
  getAppointmentById(appointmentId: number): Observable<any> {
    const url = `${BaseURL.base}/api/Appointment/${appointmentId}`;
    return this._HttpClient.get(url);
  }

  // ✅ Get All Appointments
  getAllAppointments(pageSize: number, pageIndex: number): Observable<any> {
    const url = `${BaseURL.base}/Appointments`;
    const params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageIndex', pageIndex);
    return this._HttpClient.get(url, { params });
  }
}

