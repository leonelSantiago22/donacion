import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //peticiones http
import { environment } from '../environments/environment'; //variables de entorno
import { Subscriber } from 'rxjs';
//variables globales

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //para poder accesar a los servicios http
  constructor(private http: HttpClient) {  }
  //informacion para verificar un usuario
  VerificarEnfermera(numero_trabajador:any, password:any) {
    let enfermera = {
      'numero_trabajador':numero_trabajador,
      'password': password
    }
    console.log(numero_trabajador,password);
    return this.http.post(`${environment.API_URI}/api/enfermera/verificar/`,enfermera);
    }
  List()
  {
    return this.http.get(`${environment.API_URI}/api/enfermera/List/`);
  }
  VerificarAdministrador(numero_trabajador:any, password:any) {
    let administrador = {
      'numero_trabajador':numero_trabajador,
      'password': password
    }
    console.log(numero_trabajador,password);
    return this.http.post(`${environment.API_URI}/api/administrador/verificar/`,administrador);
    }
}
