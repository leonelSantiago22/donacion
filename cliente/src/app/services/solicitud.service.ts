import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';
import { headers } from '../models/headers';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private http: HttpClient) { }
  listSolicitudes()
  {
    return this.http.get(`${environment.API_URI}/api/solicitud`,{headers:headers});
  }
  deleteSolicitud(idsolicitud: any)
  {
    return this.http.delete(`${environment.API_URI}/api/solicitud/delete/`+idsolicitud,{headers:headers}); 
  }
  listOne(idsolicitud:any)
  {
    return this.http.get(`${environment.API_URI}/api/solicitud/`+idsolicitud,{headers:headers});
  }
  agregarSolicitud(solicitud: any)
  {
    return this.http.post(`${environment.API_URI}/api/solicitud/`,solicitud,{headers:headers});
  }
  updateSolicitud(solicitud:any)
  {
    return this.http.put(`${environment.API_URI}/api/solicitud/update/`+solicitud.idsolicitud,solicitud,{headers:headers});
  }

}
