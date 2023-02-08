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
  bancos : any;
  bancos2 : any;
  banco:any;
  constructor(private bancoService :BancoService) {
    this.listarBancos();
  }
  ngOnInit() 
  {
    this.bancos = new Bancos();
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
  preparar(){
    $('#mymodal').modal({
          dismissible: false
    });
    $('#mymodal').modal('open');
  }

}
