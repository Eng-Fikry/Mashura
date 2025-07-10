import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../../base-url';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private _HttpClient:HttpClient) 
  {

  }


  getDoctor(): Observable<any> {
    const id = localStorage.getItem('id'); 
    return this._HttpClient.get(`${BaseURL.base}/api/Doctor/byStringId/${id}`);
  }
  getDoctorid(id:number): Observable<any> {
    
    return this._HttpClient.get(`${BaseURL.base}/api/Doctor/${id}`);
  }
  getDoctorByName(name:string): Observable<any> {
    const params = new HttpParams()
          .set('name', name)
    return this._HttpClient.get(`${BaseURL.base}/api/Doctor/`,{ params });
  }

  updateDoctor(data: any): Observable<any> 
  {
    const token = localStorage.getItem('token'); 
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const id=localStorage.getItem('id2');
    
  
    return this._HttpClient.put(`${BaseURL.base}/api/Doctor/${id}`, data,{ headers });
  }

  getDoctorAvailableAppointments(date:any,id:number): Observable<any> 
  {
    const token = localStorage.getItem('token'); 
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams()
          .set('Day', date)
          return this._HttpClient.get(`${BaseURL.base}/api/Doctor/${id}/AvailableAppointments`, { params, headers })
        }


 getAllDoctors(): Observable<any> 
        {
          const token = localStorage.getItem('token'); 
        
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          
          
        
          return this._HttpClient.get(`${BaseURL.base}/api/Doctor/Doctors?PageIndex=1&PageSize=10`, { headers });
        }


  getDoctorClinics():Observable<any>  {
    const token = localStorage.getItem('token'); 
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
          return this._HttpClient.get(`${BaseURL.base}/api/Doctor/MyClinics`, {  headers })
        }

    patienthoistory(data:any):Observable<any>
    {
      const token = localStorage.getItem('token'); 
    
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      
            return this._HttpClient.post(`${BaseURL.base}/api/Patient/AddHistory`,data, {  headers })

    }  
    
    
    gethistory(id:number):Observable<any>
    {
      const token = localStorage.getItem('token'); 
    
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      
            return this._HttpClient.get(`${BaseURL.base}/api/Patient/${id}/History`, {  headers })

    } 
  }     



