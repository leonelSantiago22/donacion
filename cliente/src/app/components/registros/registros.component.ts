import { Component } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent {
  registro:any; 
  constructor (private inventarioService : InventarioService)
  {
    this.listarRegistros();
  }
  listarRegistros()
  {
    this.inventarioService.listRegistrosDonacion().subscribe((resRegistros: any) => {
      console.log(resRegistros);
      this.registro=resRegistros;
  },
      (err: any) => console.error(err)
    );
  }
}
