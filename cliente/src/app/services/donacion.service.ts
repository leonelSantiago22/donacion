import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //peticiones http
import {environment} from '../environments/environment';
import { headers } from '../models/headers';
@Injectable({
  providedIn: 'root'
})
export class DonacionService {

  constructor(private http: HttpClient) { }
  listarDonaciones()
  {
     return this.http.get(`${environment.API_URI}/api/donacion`,{headers:headers});
  }
  agregarDonacion(donacion:any)
  {
    return this.http.post(`${environment.API_URI}/api/donacion/`,donacion,{headers:headers});
  }
}
