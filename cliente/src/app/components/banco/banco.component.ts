import { Component } from '@angular/core';
import { Bancos } from 'src/app/models/banco';
import { Bancos2 } from 'src/app/models/banco2';
import { BancoService } from 'src/app/services/banco.service';
declare var  $:any;
@Component({
  selector: 'app-banco',
  templateUrl: './banco.component.html',
  styleUrls: ['./banco.component.css']
})
export class BancoComponent {
  bancosAgregar : any;
  bancosModificar: any;
  bancos2 : any;
  banco:any;
  bancos:any;
  constructor(private bancoService :BancoService) {
    this.listarBancos();
  }
  ngOnInit() 
  {
    this.bancosAgregar = new Bancos();
    this.bancosModificar = new Bancos();
  } 
  listarBancos()
  {
    this.bancoService.listBancos().subscribe((resBanco: any) => {
      console.log(resBanco);
      this.banco  = resBanco;
  },
      (err: any) => console.error(err)
    );
  }

  listarInventarioBanco(idbanco:any)
  {
    this.bancoService.listarInventario(idbanco).subscribe((resBanco: any) => {
      console.log(resBanco);
      this.bancos2  = resBanco;
  },
      (err: any) => console.error(err)
    );
  }

  visualizarBanco(idbanco:any)
  {
    this.bancoService.listOneBanco(idbanco).subscribe((resBanco: any) => {
      console.log(resBanco);
      this.bancosModificar  = resBanco;
  },
      (err: any) => console.error(err)
    );
  }
  eliminarBanco(idbanco:any)
  {
    this.bancoService.eliminarBanco(idbanco).subscribe((resBanco: any) => {
      console.log(resBanco);
      this.banco  = resBanco;
      this.listarBancos();
  },
      (err: any) => console.error(err)
    );
  }
  agregarBanco()
  {
    this.bancoService.agregarBanco(this.bancosAgregar).subscribe((resBanco: any) => {
      console.log(resBanco);
      this.bancosAgregar  = resBanco;
      this.listarBancos();
  },
      (err: any) => console.error(err)
    );
  }
  actualizarBanco()
  {
    this.bancoService.actulizarBanco(this.bancosModificar).subscribe((resBanco: any) => {
      console.log(resBanco);
      this.bancosModificar  = resBanco;
      this.listarBancos();
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
  prepararModificar(){
    $('#mymodalModificar').modal({
          dismissible: false
    });
    $('#mymodalModificar').modal('open');
  }
  prepararAgregar(){
    $('#mymodalAgregarBanco').modal({
          dismissible: false
    });
    $('#mymodalAgregarBanco').modal('open');
  }

}
