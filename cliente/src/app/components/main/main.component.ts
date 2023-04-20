import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Solicitud } from 'src/app/models/solicitud';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  solicitud:any;
    constructor(private router: Router,private solicitudService :SolicitudService)
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
}