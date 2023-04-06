
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class CorreoServiceService {
  constructor(private http: HttpClient) { }
  enviarCorreoRecuperarContrasenya(body: any) {
    return this.http.post(`${environment.API_URI_CORREOS}/enviarCorreoRecuperarContrasenya/`, body);
  }
  decodificarMail(token: any) {
    let dato = { "token": token };
    return this.http.post(`${environment.API_URI_CORREOS}/decodificarMail`, dato);
  }
  
}