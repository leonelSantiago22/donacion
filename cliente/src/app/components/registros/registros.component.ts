import { Component } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
import { ExcelService } from 'src/app/services/excel.service';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent {
  registro:any; 
  liga: string = environment.API_URI_IMAGENES;
  constructor (private inventarioService : InventarioService, 
    private excelService: ExcelService)
  {
    this.listarRegistros();
  }
  listarRegistros()
  {
    this.inventarioService.listRegistrosDonacion().subscribe((resRegistros: any) => {
      //console.logresRegistros);
      this.registro=resRegistros;
  },
      (err: any) => console.error(err)
    );
  }
  exportAsXLSX() {
    let element = document.getElementById('tablaRegistros');
    this.excelService.exportAsExcelFile(element, 'sample');
  }

}
