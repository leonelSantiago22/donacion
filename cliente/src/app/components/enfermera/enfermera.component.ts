import { Component } from '@angular/core';
import { Enfermera } from 'src/app/models/enfermera';
import { EnfermeraService } from 'src/app/services/enfermera.service';
import { JQueryStyleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';
import {Persona} from 'src/app/models/persona';
declare var $: any;
@Component({
  selector: 'app-enfermera',
  templateUrl: './enfermera.component.html',
  styleUrls: ['./enfermera.component.css']
})
export class EnfermeraComponent {
  enfermera:any;
  enfermeras:any;
  personas:any;
  ngOnInit() 
  {
    this.personas = new Persona();
    this.enfermeras = new Enfermera();
  }  
  constructor(private enfermeraService: EnfermeraService, private router: Router, private personaServices : PersonaService){
    this.listarEnfermeras();
   }
  listarEnfermeras()
  {
    this.enfermeraService.listEnfermera().subscribe((resEnfermera: any) => {
      console.log(resEnfermera);
      this.enfermera=resEnfermera;
  },
      (err: any) => console.error(err)
    );
  }
  updateEnfermera()
  {
    console.log("enfermera");
  }
  visualizarEnfermera(numero_trabajador:any)
  {
    this.enfermeraService.listOneEnfermera(numero_trabajador).subscribe((resEnfermera: any) => {
      console.log(resEnfermera);
      this.enfermeras=resEnfermera;
  },
      (err: any) => console.error(err)
    );
  }
  visualizarPersona(idpersona:any)
  {
    this.personaServices.listOnePersona(idpersona).subscribe((resPersona: any) => {
      console.log(resPersona);
      this.personas=resPersona;
  },
      (err: any) => console.error(err)
    );
  }
  preparar(){
    $('#mymodal2').modal({
          dismissible: false
    });
    $('#mymodal2').modal('open');
  }
  preparar2(){
    $('#mymodal').modal({
          dismissible: false
    });
    $('#mymodal').modal('open');
  }
  static()
    {
      this.router.navigate(['enfermera']);
    }
}
