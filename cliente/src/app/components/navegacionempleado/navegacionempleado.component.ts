import { Component } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/models/paciente';
import { DonadorService } from 'src/app/services/donador.service';
import { Donador } from 'src/app/models/donador';
import { Donacion } from 'src/app/models/donacion';
import { DonacionService } from 'src/app/services/donacion.service';
import { TransfucinesService } from 'src/app/services/transfucines.service';
import { Transfucion } from 'src/app/models/transfucion';
declare var $ : any;
@Component({
  selector: 'app-navegacionempleado',
  templateUrl: './navegacionempleado.component.html',
  styleUrls: ['./navegacionempleado.component.css']
})
export class NavegacionempleadoComponent {
  solicitudes :any;
  pacienteVar : any;
  donadores :any;
  donacion : any;
  transfuciones:any;
  constructor(private solicitudService: SolicitudService,
    private pacienteService : PacienteService,
    private donadorService: DonadorService,
    private donacionService:DonacionService,
    private transfucionService : TransfucinesService)
  {
    
  }
  ngOnInit()
  {
    $(document).on('focus','.dropdown-trigger',function(){
            $('.dropdown-trigger').dropdown();
            });
    this.solicitudes = new Solicitud();
    this.pacienteVar = new Paciente();
    this.donadores = new Donador();
    this.donacion = new Donacion();
    this.transfuciones = new Transfucion();
  }
  //requisitos para solicitud 
  agregarSolicitud()
  {
    this.solicitudService.agregarSolicitud(this.solicitudes).subscribe((resSolcitud: any) => {
      console.log(resSolcitud);
      this.solicitudes = resSolcitud;
  },
      (err: any) => console.error(err)
    );
  }
  prepararSolicitud()
  {
        $('#mymodalSolicitud').modal({
          dismissible: false
        });
        $('#mymodalSolicitud').modal('open');
  }
  //requsitos para paciente 
  agregarPaciente()
  {
    this.pacienteService.insertPaciente(this.pacienteVar).subscribe((resPaciente: any) => {
      console.log(resPaciente);
      this.pacienteVar=resPaciente;
  },
      (err: any) => console.error(err)
    );
  } 
  prepararPaciente()
  {
    $('#mymodalPaciente').modal({
      dismissible: false
    });
    $('#mymodalPaciente').modal('open');
  }
  //requsitos para donador 
  agregarDonador()
  {
      //primero insertamos a la persona
      this.donadorService.insertarDonador(this.donadores).subscribe((resClientes: any) => {
        console.log(resClientes);
        this.donadores=resClientes;
    },
        (err: any) => console.error(err)
      );
  }

  prepararDonador(){
    $('#mymodalDonador').modal({
          dismissible: false
    });
    $('#mymodalDonador').modal('open');
  }

  //requsuitos para donacion 
  agregarDonacion()
  {
    this.donacionService.agregarDonacion(this.donacion).subscribe((resDonacion: any) => {
      console.log(resDonacion);
      this.donacion=resDonacion;
  },
      (err: any) => console.error(err)
    ); 
  }
  prepararDonacion(){
    $('#mymodalDonacion').modal({
          dismissible: false
    });
    $('#mymodalDonacion').modal('open');
  }
  //requisitos para transfucion
  agregarTransfucion()
  {
    this.transfucionService.agregarTransfucion(this.transfuciones).subscribe((resTransfucion: any) => {
      console.log(resTransfucion);
      this.transfuciones=resTransfucion;
  },
      (err: any) => console.error(err)
    );
  }
  prepararTransfucion()
  {
    $('#mymodalTransfucion').modal({
      dismissible: false
      });
      $('#mymodalTransfucion').modal('open');
  } 
}
