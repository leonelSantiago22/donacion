import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //peticiones http
import {environment} from '../environments/environment';
import { headers } from '../models/headers';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) { }
  listPacientes()
  {
    return this.http.get(`${environment.API_URI}/api/paciente`,{headers:headers});
  }
  deletePacientes(idpaciente:any)
  {
    return this.http.delete(`${environment.API_URI}/api/paciente/delete/`+idpaciente,{headers:headers}); 
  }
  updatePaciente(paciente:any)
  {
    return this.http.put(`${environment.API_URI}/api/paciente/actualizar/`+paciente.idpaciente+"/"+paciente.idpersona,paciente,{headers:headers}); 
  }
  insertPaciente(paciente:any)
  {
    return this.http.post(`${environment.API_URI}/api/paciente/create/`,paciente,{headers:headers});
  }
  listOne(idpaciente:any, idpersona:any)
  {
    return this.http.get(`${environment.API_URI}/api/paciente/`+idpaciente+'/'+idpersona,{headers:headers});
  }
  listOnepaciente(idpaciente:any)
  {
    return this.http.get(`${environment.API_URI}/api/paciente/list/`+idpaciente,{headers:headers});
  }

}
