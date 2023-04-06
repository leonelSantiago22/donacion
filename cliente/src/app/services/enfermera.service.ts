import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment'
import { headers } from '../models/headers';

@Injectable({
  providedIn: 'root'
})
export class EnfermeraService {

  constructor(private http: HttpClient) { }
  listEnfermera()
  {
    return this.http.get(`${environment.API_URI}/api/enfermera`,{headers:headers});
  }
  maxima()
  {
    return this.http.get(`${environment.API_URI}/api/enfermera/max/`,{headers:headers});
  }
  deleteEnfermera(numero_trabajador: any)
  {
    return this.http.delete(`${environment.API_URI}/api/enfermera/delete/`+numero_trabajador,{headers:headers}); 
  }
  agregarEnfermera(enfermera:any)
  {
    return this.http.post(`${environment.API_URI}/api/enfermera/create/`,enfermera,{headers:headers});
  }
  listOneEnfermera(numero_trabajador:any,idpersona:any)
  {
    return this.http.get(`${environment.API_URI}/api/enfermera/list/`+numero_trabajador+"/"+idpersona,{headers:headers});
  }
  updateEnfermera(enfermera:any)
  {
    return this.http.put(`${environment.API_URI}/api/enfermera/updates/`+enfermera.numero_trabajador+"/"+enfermera.idpersona,enfermera,{headers:headers}); 
  }
}
