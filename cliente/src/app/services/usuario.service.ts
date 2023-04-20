import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //peticiones http
import { environment } from '../environments/environment'; //variables de entorno
import { Subscriber } from 'rxjs';
import { headers } from '../models/headers';
//variables globales

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  //para poder accesar a los servicios http
  constructor(private http: HttpClient) {}
  //informacion para verificar un usuario
  VerificarEnfermera(numero_trabajador: any, password: any) {
    let enfermera = {
      numero_trabajador: numero_trabajador,
      password: password,
    };
    console.log(numero_trabajador, password);
    return this.http.post(
      `${environment.API_URI}/api/enfermera/verificar/`,
      enfermera,
      { headers: headers }
    );
  }
  List() {
    return this.http.get(`${environment.API_URI}/api/enfermera/List/`, {
      headers: headers,
    });
  }
  VerificarAdministrador(numero_trabajador: any, password: any) {
    let administrador = {
      numero_trabajador: numero_trabajador,
      password: password,
    };
    console.log(numero_trabajador, password);
    return this.http.post(
      `${environment.API_URI}/api/administrador/verificar/`,
      administrador,
      { headers: headers }
    );
  }
  enviarCorreoRecuperarContrasenya(body: any) {
    return this.http.post(
      `${environment.API_URI_CORREOS}/enviarCorreoRecuperarContrasenya/`,
      body
    );
  }
  decodificarMail(token: any) {
    let dato = { token: token };
    return this.http.post(
      `${environment.API_URI_CORREOS}/decodificarMail`,
      dato
    );
  }
}
