import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //peticiones http
import {environment} from '../environments/environment';
import { headers } from '../models/headers';
@Injectable({
  providedIn: 'root'
})
export class BancoService {

  constructor(private http: HttpClient) { }
  listBancos()
  {
    return this.http.get(`${environment.API_URI}/api/banco`,{headers:headers});
  }
  listarInventario(idbanco:any)
  {
    return this.http.get(`${environment.API_URI}/api/banco/inventario/`+idbanco,{headers:headers});
  }
  listOneBanco(idbanco:any)
  {
    return this.http.get(`${environment.API_URI}/api/banco/`+idbanco,{headers:headers});
  }
  eliminarBanco(idbanco:any)
  {
    return this.http.delete(`${environment.API_URI}/api/banco/delete/`+idbanco,{headers:headers}); 
  }
  agregarBanco(banco:any)
  {
    return this.http.post(`${environment.API_URI}/api/banco/`,banco,{headers:headers});
  }
  actulizarBanco(banco:any)
  {
    return this.http.put(`${environment.API_URI}/api/banco/update/`+banco.idbanco, banco,{headers:headers});   
  }
}
