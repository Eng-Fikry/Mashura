import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseURL } from '../../base-url';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private _HttpClient:HttpClient) { }

  createPatient(data: any): Observable<any> {
      const token = localStorage.getItem('token'); 
    
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    
      return this._HttpClient.post(`${BaseURL.base}/api/Patient`, data, { headers });
    }

    getPatient(): Observable<any> {
      const id = localStorage.getItem('id'); 
      return this._HttpClient.get(`${BaseURL.base}/api/Patient/byStringId/${id}`);
    }

    updatePatient(data: any): Observable<any> 
  {
    const token = localStorage.getItem('token'); 
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const id=localStorage.getItem('id2');
    
  
    return this._HttpClient.put(`${BaseURL.base}/api/Patient/${id}`, data,{ headers });
  }
}
