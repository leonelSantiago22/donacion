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
  listOneBanco(idbanco:any)
  {
    return this.http.get(`${environment.API_URI}/api/banco/`+idbanco);
  }
  eliminarBanco(idbanco:any)
  {
    return this.http.delete(`${environment.API_URI}/api/banco/delete/`+idbanco); 
  }
  agregarBanco(banco:any)
  {
    return this.http.post(`${environment.API_URI}/api/banco/`,banco);
  }
  actulizarBanco(banco:any)
  {
    return this.http.put(`${environment.API_URI}/api/banco/update/`+banco.idbanco, banco);   
  }
}
