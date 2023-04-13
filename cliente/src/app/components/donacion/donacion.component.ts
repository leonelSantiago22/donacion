import { Component } from '@angular/core';
import { DonacionService } from 'src/app/services/donacion.service';
import { DonadorService } from 'src/app/services/donador.service';
import { BancoService } from 'src/app/services/banco.service';
import { Bancos } from 'src/app/models/banco';
import { Donador } from 'src/app/models/donador';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { ExcelService } from 'src/app/services/excel.service';
import { environment } from 'src/app/environments/environment';
declare var $ : any;
@Component({
  selector: 'app-donacion',
  templateUrl: './donacion.component.html',
  styleUrls: ['./donacion.component.css']
})
export class DonacionComponent {
  donacion:any;
  bancos:any;
  donador:any;
  liga:string = environment.API_URI_IMAGENES;
  
  constructor(private donacionService: DonacionService, 
    private bancoService:BancoService, 
    private donadoreService : DonacionService,
    private comunicacionService : ComunicacionService,
    private excelService: ExcelService)
  {
    this.listarDonaciones();
    this.comunicacionService.observador$.subscribe(
      (msg) =>
      {
        if(msg.componente == 3)
        {
          this.listarDonaciones();
        }
      }
      );
  }
  ngOnInit()
  {
    this.bancos =  new Bancos();
    this.donador = new Donador();
  }
  listarDonaciones()
  {
    this.donacionService.listarDonaciones().subscribe((resDonaciones: any) => {
      console.log(resDonaciones);
      this.donacion=resDonaciones
  },
      (err: any) => console.error(err)
    );
  }
  visualizarInformacion(idbanco:any)
  {
    this.listBanco(idbanco);
    this.preparar();
  }
  listBanco(idbanco:any)
  {
    this.bancoService.listOneBanco(idbanco).subscribe((resBanco: any) => {
      console.log(resBanco);
      this.bancos=resBanco;
  },
      (err: any) => console.error(err)
    );
  }
  preparar()
  {
    $('#mymodal').modal({
      dismissible: false
    });
    $('#mymodal').modal('open');
  }
  exportAsXLSX()
  {
    let element = document.getElementById('tablaDonaciones');
    this.excelService.exportAsExcelFile(element, 'sample');
  }
}
