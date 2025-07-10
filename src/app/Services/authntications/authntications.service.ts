import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseURL } from '../../base-url';

@Injectable({
  providedIn: 'root'
})
export class AuthnticationsService {

  constructor(public _HttpClient:HttpClient) { }


  
  login(data: any): Observable<any> {
    return this._HttpClient.post(`${BaseURL.base}/api/Account/Login`, data);
  }
  signup(data: any): Observable<any> {
    return this._HttpClient.post(`${BaseURL.base}/api/Account/Register`, data);
  }
  changepassword(data: any): Observable<any> {
    const token = localStorage.getItem('token'); 
          
            const headers = new HttpHeaders({
              'Authorization': `Bearer ${token}`
            });
    return this._HttpClient.post(`${BaseURL.base}/api/account/ChangePassword`, data, { headers });
  }

  forgetPassword(data:any):Observable<any>
  {
    return this._HttpClient.post(`${BaseURL.base}/api/Account/ForgetPassword`,data); 
  }

  checkEmailExisit(email:any):Observable<any>
  {
    return this._HttpClient.get(`${BaseURL.base}/api/Account/CheckEmailExist?email=${email}`); 
  }

  resetPassword(data:any):Observable<any>
  {
    return this._HttpClient.post(`${BaseURL.base}/api/account/ResetPassword`,data);

  }



}
