import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }
  listHospital()
  {
    return this.http.get(`${environment.API_URI}/api/hospital`);
  }
  agregarHospital(hospital:any)
  {
    return this.http.post(`${environment.API_URI}/api/enfermera/`,hospital);
  }
}
