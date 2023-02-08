import { Component } from '@angular/core';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Router } from '@angular/router';
import { Solicitud } from 'src/app/models/solicitud';
declare var  $:any;
@Component({
  selector: 'app-solicitudes-administrado',
  templateUrl: './solicitudes-administrado.component.html',
  styleUrls: ['./solicitudes-administrado.component.css']
})
export class SolicitudesAdministradoComponent {
  solicitud:any;
  solicitudes:any;
  constructor(private solicitudService :SolicitudService,private router: Router)
  {
    this.listarSolicitudes();
  }
  ngOnInit()
  {
    this.solicitudes = new Solicitud();
  }
  listarSolicitudes()
  {
    this.solicitudService.listSolicitudes().subscribe((resCategorias: any) => {
      console.log(resCategorias);
      this.solicitud=resCategorias;
  },
      (err: any) => console.error(err)
    );
  }

  eliminarSolicitud(idsolicitud:any){
    this.solicitudService.deleteSolicitud(idsolicitud).subscribe((resCategorias: any) => {
      console.log(resCategorias);
      console.log(this.solicitud);
      this.listarSolicitudes();
  },
      (err: any) => console.error(err)
    );
  }

  changeDonadores()
  {
    this.router.navigate(['donadores']);
  }
  changePaciente()
    {
      this.router.navigate(['paciente']);
    }
  agregarSolicitud()
  {
    this.solicitudService.agregarSolicitud(this.solicitudes).subscribe((resSolcitud: any) => {
      console.log(resSolcitud);
      this.solicitud = resSolcitud;
      this.listarSolicitudes();
  },
      (err: any) => console.error(err)
    );
  }
  visualizarSolicitud(idsolicitud:any)
  {
    console.log(idsolicitud);
    
    this.solicitudService.listOne(idsolicitud).subscribe((resClientes: any) => {
      console.log(resClientes);
      this.solicitudes=resClientes;
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
  static()
  {
    this.router.navigate(['solicitud']);
  }
  updateSolicitud()
  {
    this.solicitudService.updateSolicitud(this.solicitudes).subscribe((resClientes: any) => {
      console.log(resClientes);
      this.solicitudes=resClientes;
      this.listarSolicitudes(); 
  },
      (err: any) => console.error(err)
    );
  }
}
