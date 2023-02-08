import { Component } from '@angular/core';
import { Transfucion } from 'src/app/models/transfucion';
import { TransfucinesService } from 'src/app/services/transfucines.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { Persona } from 'src/app/models/persona';
import { Paciente } from 'src/app/models/paciente';
declare var  $:any;
@Component({
  selector: 'app-transfuciones',
  templateUrl: './transfuciones.component.html',
  styleUrls: ['./transfuciones.component.css']
})
export class TransfucionesComponent {
  tranfucion: any;
  tranfuciones = new Transfucion();
  pacienteVar = new Paciente();
  personas = new Paciente();
  constructor (private tranfucionService : TransfucinesService, private pacienteService : PacienteService) 
  {
    this.listarTransfuciones();
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
}
