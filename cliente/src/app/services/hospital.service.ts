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
  listOneHospital(idhospital:any)
  {
    return this.http.get(`${environment.API_URI}/api/hospital/list/`+idhospital);
  }
  agregarHospital(hospital:any)
  {
    return this.http.post(`${environment.API_URI}/api/hospital/`,hospital);
  }
  actualizarHospial(hospital:any)
  {
    return this.http.put(`${environment.API_URI}/api/hospital/update/`+hospital.idhospital,hospital); 
  }
  deleteHosptital(idhospital:any)
  {
    return this.http.delete(`${environment.API_URI}/api/hospital/delete/`+idhospital); 
  }
}
