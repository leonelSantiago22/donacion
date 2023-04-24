import { Component } from '@angular/core';

import { ExcelService } from 'src/app/services/excel.service';
import { environment } from 'src/app/environments/environment';

import { InventarioService } from 'src/app/services/inventario.service';
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  inventario : any;
  liga: string = environment.API_URI_IMAGENES;
  constructor(private inventarioService : InventarioService,
    private excelService: ExcelService
    )
  {
    this.listarInventario();
  }
  exportAsXLSX() {
    let element = document.getElementById('tablaInventario');
    this.excelService.exportAsExcelFile(element, 'sample');
  }

  listarInventario()
  {
    this.inventarioService.listInventario().subscribe((resInventario: any) => {
      //console.logresInventario);
      this.inventario=resInventario;
  },
      (err: any) => console.error(err)
    );
  } 

}
