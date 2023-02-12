import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //peticiones http
import {environment} from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DonadorService {

  constructor(private http: HttpClient) { }
  listarDonadores()
  {
     return this.http.get(`${environment.API_URI}/api/donador`);
  }
  deleteDonadores(iddonador:any)
  {
    return this.http.delete(`${environment.API_URI}/api/donador/delete/`+iddonador); 
  }
  updateDonadores(donadores:any)
  {
    return this.http.put(`${environment.API_URI}/api/donador/update/`+donadores.iddonador+"/"+donadores.idpersona,donadores);   
  }
  insertarDonador(donadores:any)
  {
    return this.http.post(`${environment.API_URI}/api/donador/create/`,donadores);
  }
  listOne(iddonador:any, idpersona:any)
  {
    return this.http.get(`${environment.API_URI}/api/donador/`+iddonador+'/'+idpersona);
  }
}
