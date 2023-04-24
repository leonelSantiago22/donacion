import { Component } from '@angular/core';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Router } from '@angular/router';
import { Solicitud } from 'src/app/models/solicitud';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
declare var  $:any;
import { ExcelService } from 'src/app/services/excel.service';
import { environment } from 'src/app/environments/environment';
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent {
  solicitud:any;
  solicitudes:any;
  liga: string = environment.API_URI_IMAGENES;
  constructor(private solicitudService :SolicitudService,private router: Router,
    private comunicacionService : ComunicacionService, private excelService: ExcelService
    )
  {
    this.comunicacionService.observador$.subscribe(
      (msg) =>
      {
        if(msg.componente == 0)
        {
          this.listarSolicitudes();
        }
      }
      );
      this.listarSolicitudes();
  }
  ngOnInit()
  {
    this.solicitudes = new Solicitud();
  }
  exportAsXLSX() {
    let element = document.getElementById('tablaSolicitud');
    this.excelService.exportAsExcelFile(element, 'sample');
  }

  listarSolicitudes()
  {
    this.solicitudService.listSolicitudes().subscribe((resCategorias: any) => {
      //console.logresCategorias);
      this.solicitud=resCategorias;
  },
      (err: any) => console.error(err)
    );
  }

  eliminarSolicitud(idsolicitud:any){
    this.solicitudService.deleteSolicitud(idsolicitud).subscribe((resCategorias: any) => {
      //console.logresCategorias);
      //console.logthis.solicitud);
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
      //console.logresSolcitud);
      this.solicitud = resSolcitud;
      this.listarSolicitudes();
  },
      (err: any) => console.error(err)
    );
  }
  visualizarSolicitud(idsolicitud:any)
  {
    //console.logidsolicitud);
    
    this.solicitudService.listOne(idsolicitud).subscribe((resClientes: any) => {
      //console.logresClientes);
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
      //console.logresClientes);
      this.solicitudes=resClientes;
      this.listarSolicitudes(); 
  },
      (err: any) => console.error(err)
    );
  }
}
