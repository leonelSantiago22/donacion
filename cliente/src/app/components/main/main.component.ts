import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Solicitud } from 'src/app/models/solicitud';
import { ExcelService } from 'src/app/services/excel.service';
import { environment } from 'src/app/environments/environment';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  solicitud:any;
  liga:string = environment.API_URI_IMAGENES;
    constructor(private router: Router,
      private solicitudService :SolicitudService,
      private excelService: ExcelService)
    {
      this.listarSolicitudes();
    }
    changeSolicitud()
    {
      this.router.navigate(['solicitud']);
    }
    changeBolsadeSangre()
    {
      this.router.navigate(['bolsa_de_sangre']);
    }
    changePaciente()
    {
      this.router.navigate(['paciente']);
    }
    changeDonadores()
    {
      this.router.navigate(['donadores']);
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
    exportAsXLSX()
    {
      let element = document.getElementById('tablaMain');
      this.excelService.exportAsExcelFile(element, 'sample');
    }
}