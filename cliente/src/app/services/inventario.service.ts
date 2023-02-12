import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }
  listInventario()
  {
    return this.http.get(`${environment.API_URI}/api/inventario`);
  }
  listRegistrosDonacion()
  {
    return this.http.get(`${environment.API_URI}/api/registro`);
  }
}
