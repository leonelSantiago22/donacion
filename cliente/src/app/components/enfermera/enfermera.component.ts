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
  enfermerasAgregar:any;
  ngOnInit() 
  {
    this.personas = new Persona();
    this.enfermeras = new Enfermera();
    this.enfermerasAgregar = new Enfermera();
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
 eliminarEnfermera(numero_trabajador:any)
 {
  this.enfermeraService.deleteEnfermera(numero_trabajador).subscribe((resEnfermera: any) => {
    console.log(resEnfermera);
    this.enfermeras=resEnfermera;
    this.listarEnfermeras();
    },
    (err: any) => console.error(err)
  );
 }
  visualizarEnfermera(numero_trabajador:any,idpersona:any)
  {
    this.enfermeraService.listOneEnfermera(numero_trabajador,idpersona).subscribe((resEnfermera: any) => {
      console.log(resEnfermera);
      this.enfermeras=resEnfermera;
      },
      (err: any) => console.error(err)
    );
  }
  actualizarEnfermera()
  {
    this.enfermeraService.updateEnfermera(this.enfermeras).subscribe((resEnfermera: any) => {
      console.log(resEnfermera);
      this.enfermeras = resEnfermera;
      this.listarEnfermeras();
      },
      (err: any) => console.error(err)
    );
  }
  agregarEnfermera()
  {
    this.enfermeraService.agregarEnfermera(this.enfermerasAgregar).subscribe((resEnfermera: any) => {
      console.log(resEnfermera);
      this.enfermeras = resEnfermera;
      this.listarEnfermeras();
      },
      (err: any) => console.error(err)
    );
  }
  visualizarPersona(idpersona:any)
  {
    this.personaServices.listOnePersona(idpersona).subscribe((resPersona: any) => {
      console.log(resPersona);
      this.enfermeras=resPersona;
  },
      (err: any) => console.error(err)
    );
  }
  prepararModificar(){
    $('#mymodalModificar').modal({
          dismissible: false
    });
    $('#mymodalModificar').modal('open');
  }
  prepararAgregar(){
    $('#mymodalAgregar').modal({
          dismissible: false
    });
    $('#mymodalAgregar').modal('open');
  }
  static()
    {
      this.router.navigate(['enfermera']);
    }
}
