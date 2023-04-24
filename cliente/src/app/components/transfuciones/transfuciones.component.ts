import { Component } from '@angular/core';
import { Transfucion } from 'src/app/models/transfucion';
import { TransfucinesService } from 'src/app/services/transfucines.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { Persona } from 'src/app/models/persona';
import { Paciente } from 'src/app/models/paciente';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { ExcelService } from 'src/app/services/excel.service';
import { environment } from 'src/app/environments/environment';

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
  
  liga: string = environment.API_URI_IMAGENES;
  personas :any;
  constructor (private tranfucionService : TransfucinesService, private pacienteService : PacienteService,
    private comunicacionService : ComunicacionService, private excelService: ExcelService) 
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
  exportAsXLSX() {
    let element = document.getElementById('tablaTrans');
    this.excelService.exportAsExcelFile(element, 'sample');
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
      //console.logresTransfucion);
      this.tranfucion=resTransfucion;
  },
      (err: any) => console.error(err)
    );
  }
  agregarTransfucion()
  {
    this.tranfucionService.agregarTransfucion(this.transfuciones).subscribe((resTransfucion: any) => {
      //console.logresTransfucion);
      this.transfuciones=resTransfucion;
  },
      (err: any) => console.error(err)
    );
  }
  
  visualizarPaciente(idpaciente:any)
  {
    this.pacienteService.listOnepaciente(idpaciente).subscribe((resClientes: any) => {
      //console.logresClientes);
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
