import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class EnfermeraService {

  constructor(private http: HttpClient) { }
  listEnfermera()
  {
    return this.http.get(`${environment.API_URI}/api/enfermera`);
  }
  deleteEnfermera(numero_trabajador: any)
  {
    return this.http.delete(`${environment.API_URI}/api/enfermera/`+numero_trabajador); 
  }
  agregarEnfermera(enfermera:any)
  {
    return this.http.post(`${environment.API_URI}/api/enfermera/`,enfermera);
  }
  listOneEnfermera(numero_trabajador:any)
  {
    return this.http.get(`${environment.API_URI}/api/enfermera/list/`+numero_trabajador);
  }
  updateEnfermera(enfermera:any)
  {
    return this.http.put(`${environment.API_URI}/api/enfermera/update/`+enfermera.numero_trabajador,enfermera); 
  
  }
}
