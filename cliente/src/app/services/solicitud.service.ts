import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private http: HttpClient) { }
  listSolicitudes()
  {
    return this.http.get(`${environment.API_URI}/api/solicitud`);
  }
  deleteSolicitud(idsolicitud: any)
  {
    return this.http.delete(`${environment.API_URI}/api/solicitud/delete/`+idsolicitud); 
  }
  listOne(idsolicitud:any)
  {
    return this.http.get(`${environment.API_URI}/api/solicitud/`+idsolicitud);
  }
  agregarSolicitud(solicitud: any)
  {
    return this.http.post(`${environment.API_URI}/api/solicitud/`,solicitud);
  }
  updateSolicitud(solicitud:any)
  {
    return this.http.put(`${environment.API_URI}/api/solicitud/update/`+solicitud.idsolicitud,solicitud);
  }

}
