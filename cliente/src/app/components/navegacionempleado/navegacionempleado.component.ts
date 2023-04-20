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
import { ComunicacionService } from 'src/app/services/comunicacion.service';
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
  opcionActual : any; //para identificar las opciones entre componentes
    // 0 = solicitud
    //1 = paciente;
    //2 = donador; 
    //3 = donacion;
    //4 = transfucion;
    
  donacion : any;
  transfuciones:any;
  constructor(private solicitudService: SolicitudService,
    private pacienteService : PacienteService,
    private donadorService: DonadorService,
    private donacionService:DonacionService,
    private transfucionService : TransfucinesService,
    private comunicacionService: ComunicacionService)
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
      this.enviarMensaje(0);
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
      this.enviarMensaje(1);
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
        this.enviarMensaje(2);
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
      this.enviarMensaje(3);
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
     this.enviarMensaje(4);
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
  enviarMensaje(componente: number)
    {
      let opciones={"componente" :componente};
      this.comunicacionService.enviar(opciones);
    }
}
