import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //peticiones http
import {environment} from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) { }
  listPacientes()
  {
    return this.http.get(`${environment.API_URI}/api/paciente`);
  }
  deletePacientes(idpaciente:any)
  {
    return this.http.delete(`${environment.API_URI}/api/paciente/delete/`+idpaciente); 
  }
  updatePaciente(paciente:any)
  {
    return this.http.put(`${environment.API_URI}/api/paciente/update/`+paciente.idpaciente,paciente); 
  }
  insertPaciente(paciente:any)
  {
    return this.http.post(`${environment.API_URI}/api/paciente/`,paciente);
  }
  listOne(idpaciente:any, idpersona:any)
  {
    return this.http.get(`${environment.API_URI}/api/paciente/`+idpaciente+'/'+idpersona);
  }
  listOnepaciente(idpaciente:any)
  {
    return this.http.get(`${environment.API_URI}/api/paciente/list/`+idpaciente);
  }
}
