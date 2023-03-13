import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { headers } from '../models/headers';


@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {
  private observador = new BehaviorSubject<any>('');
  observador$ = this.observador.asObservable();
  enviar(mensaje:any)
  {
    this.observador.next(mensaje);
  }
  constructor() { }
}
