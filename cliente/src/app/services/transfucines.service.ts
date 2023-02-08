import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //peticiones http
import {environment} from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TransfucinesService {

  constructor(private http: HttpClient) { }
  listOneTransfucion(idtransfucion:any,idpaciente:any)
  {
    return this.http.get(`${environment.API_URI}/api/tranfucion/`+idtransfucion+idpaciente);
  }
  listSolicitudes()
  {
    return this.http.get(`${environment.API_URI}/api/transfucion`);
  
  }
}
