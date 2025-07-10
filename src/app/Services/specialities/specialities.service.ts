import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseURL } from '../../base-url';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpecialitiesService {

  constructor(private _HttpClient:HttpClient) { }


  getSpecialities():Observable<any>
  {
    return this._HttpClient.get(`${BaseURL.base}/api/Specialty`);
  }

  getClinicBySpeciality(id:number):Observable<any>
  {
    return this._HttpClient.get(`${BaseURL.base}/api/specialty/${id}/clinics`);
  }
}
