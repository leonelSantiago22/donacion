import { Component } from '@angular/core';
import { DonacionService } from 'src/app/services/donacion.service';
import { DonadorService } from 'src/app/services/donador.service';
import { BancoService } from 'src/app/services/banco.service';
import { Bancos } from 'src/app/models/banco';
declare var $ : any;
@Component({
  selector: 'app-donacion',
  templateUrl: './donacion.component.html',
  styleUrls: ['./donacion.component.css']
})
export class DonacionComponent {
  donacion:any;
  bancos:any;
  constructor(private donacionService: DonacionService, private bancoService:BancoService)
  {
    this.listarDonaciones();
  }
  ngOnInit()
  {
    this.bancos =  new Bancos();
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
      this.bancos=resBanco
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
}
