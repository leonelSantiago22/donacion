import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //peticiones http
import {environment} from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BancoService {

  constructor(private http: HttpClient) { }
  listBancos()
  {
    return this.http.get(`${environment.API_URI}/api/banco`);
  }
  listarInventario(idbanco:any)
  {
    return this.http.get(`${environment.API_URI}/api/banco/inventario/`+idbanco);
  }
}
