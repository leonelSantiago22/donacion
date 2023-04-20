import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //peticiones http
import {environment} from '../environments/environment';
import { headers } from '../models/headers';

@Injectable({
  providedIn: 'root'
})
export class TransfucinesService {

  constructor(private http: HttpClient) { }
  listOneTransfucion(idtransfucion:any,idpaciente:any)
  {
    return this.http.get(`${environment.API_URI}/api/tranfucion/`+idtransfucion+idpaciente,{headers:headers});
  }
  listSolicitudes()
  {
    return this.http.get(`${environment.API_URI}/api/transfucion`,{headers:headers});
  }
  agregarTransfucion(transfucion:any)
  {
    return this.http.post(`${environment.API_URI}/api/transfucion/`,transfucion,{headers:headers});
  }
}
