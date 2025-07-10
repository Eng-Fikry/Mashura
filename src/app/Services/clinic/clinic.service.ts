import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseURL } from '../../base-url';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor(private _HttpClient:HttpClient) { }

  addClinic(data:any):Observable<any>{
    const token = localStorage.getItem('token'); 
      
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    return this._HttpClient.post(`${BaseURL.base}/api/Clinic`,data,{ headers });
  }

  getClinicById(id:number):Observable<any>{
    const token = localStorage.getItem('token'); 
      
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    return this._HttpClient.get(`${BaseURL.base}/api/Clinic/${id}`,{ headers });
  }

  deleteClinic(id:number):Observable<any>{
    const token = localStorage.getItem('token'); 
      
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    return this._HttpClient.delete(`${BaseURL.base}/api/Clinic/${id}`,{ headers });
  }

  updateClinic(id:number,data:any):Observable<any>{
    const token = localStorage.getItem('token'); 
      
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    return this._HttpClient.put(`${BaseURL.base}/api/Clinic/${id}`,data,{ headers });
  }
}
