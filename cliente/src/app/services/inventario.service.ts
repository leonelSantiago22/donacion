import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';
import { headers } from '../models/headers';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }
  listInventario()
  {
    return this.http.get(`${environment.API_URI}/api/inventario`,{headers:headers});
  }
  listRegistrosDonacion()
  {
    return this.http.get(`${environment.API_URI}/api/registro`,{headers:headers});
  }
  listarBolsas()
  {
    return this.http.get(`${environment.API_URI}/api/bolsa`,{headers:headers});
  }
}
