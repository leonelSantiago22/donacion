import { Component } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  inventario : any;
  constructor(private inventarioService : InventarioService)
  {
    this.listarInventario();
  }
  listarInventario()
  {
    this.inventarioService.listInventario().subscribe((resInventario: any) => {
      console.log(resInventario);
      this.inventario=resInventario;
  },
      (err: any) => console.error(err)
    );
  } 

}
