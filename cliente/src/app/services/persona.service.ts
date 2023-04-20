import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //peticiones http
import {environment} from '../environments/environment';
import { headers } from '../models/headers';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient) { }
  agregarPersona(persona:any)
  {
    return this.http.post(`${environment.API_URI}/api/persona/`,persona,{headers:headers});
  }
  listPersonaMax()
  {
    return this.http.get(`${environment.API_URI}/api/persona/max`,{headers:headers});
  }
  updatePersona(persona:any)
  {
    let personas = {
      'idpersona':persona.idpersona,
      'nombre':persona.nombre,
      'edad':persona.edad,
      'genero': persona.genero
    }
    console.log(personas);
    return this.http.put(`${environment.API_URI}/api/persona/update/`+personas.idpersona,personas,{headers:headers}); 
  }
  deletePersona(idpersona:any)
  {
    return this.http.delete(`${environment.API_URI}/api/persona/delete/`+idpersona,{headers:headers}); 
  }
  listOnePersona(idpersona:any)
  {
    return this.http.get(`${environment.API_URI}/api/persona/list/`+idpersona,{headers:headers});
  }
}
