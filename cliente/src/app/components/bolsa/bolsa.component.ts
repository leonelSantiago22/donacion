import { Component } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
@Component({
  selector: 'app-bolsa',
  templateUrl: './bolsa.component.html',
  styleUrls: ['./bolsa.component.css']
})
export class BolsaComponent {
  bolsa : any;
  constructor(private inventarioService : InventarioService)
  {
    this.listarBolsa();
  }
  listarBolsa()
  {
      
    this.inventarioService.listarBolsas().subscribe((resBolsa: any) => {
      console.log(resBolsa);
      this.bolsa=resBolsa;
  },
      (err: any) => console.error(err)
    );
    
  }
}
