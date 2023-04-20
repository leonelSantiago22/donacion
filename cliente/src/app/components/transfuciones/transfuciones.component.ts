import { Component } from '@angular/core';
import { Transfucion } from 'src/app/models/transfucion';
import { TransfucinesService } from 'src/app/services/transfucines.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { Persona } from 'src/app/models/persona';
import { Paciente } from 'src/app/models/paciente';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
declare var  $:any;
@Component({
  selector: 'app-transfuciones',
  templateUrl: './transfuciones.component.html',
  styleUrls: ['./transfuciones.component.css']
})
export class TransfucionesComponent {
  tranfucion: any;
  transfuciones:any;
  pacienteVar:any;
  personas :any;
  constructor (private tranfucionService : TransfucinesService, private pacienteService : PacienteService,
    private comunicacionService : ComunicacionService) 
  {
    this.listarTransfuciones();
    this.comunicacionService.observador$.subscribe(
      (msg) =>
      {
        if(msg.componente == 4)
        {
          this.listarTransfuciones();
        }
      }
      );
  }
  ngOnInit()
  {
    this.transfuciones = new Transfucion();
    this.pacienteVar = new Paciente();
    this.personas = new Paciente();
  }
  listarTransfuciones()
  {
    this.tranfucionService.listSolicitudes().subscribe((resTransfucion: any) => {
      console.log(resTransfucion);
      this.tranfucion=resTransfucion;
  },
      (err: any) => console.error(err)
    );
  }
  agregarTransfucion()
  {
    this.tranfucionService.agregarTransfucion(this.transfuciones).subscribe((resTransfucion: any) => {
      console.log(resTransfucion);
      this.transfuciones=resTransfucion;
  },
      (err: any) => console.error(err)
    );
  }
  
  visualizarPaciente(idpaciente:any)
  {
    this.pacienteService.listOnepaciente(idpaciente).subscribe((resClientes: any) => {
      console.log(resClientes);
      this.personas = resClientes;
  },
      (err: any) => console.error(err)
    );
  }

  preparar(){
    $('#mymodal').modal({
          dismissible: false
    });
    $('#mymodal').modal('open');
  }
  prepararTransfucion()
  {
    $('#mymodalTransfucion').modal({
      dismissible: false
      });
      $('#mymodalTransfucion').modal('open');
  } 
}
