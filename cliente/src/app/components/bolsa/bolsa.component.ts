import { Component } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
import { ExcelService } from 'src/app/services/excel.service';
import { environment } from 'src/app/environments/environment';
@Component({
  selector: 'app-bolsa',
  templateUrl: './bolsa.component.html',
  styleUrls: ['./bolsa.component.css']
})
export class BolsaComponent {
  bolsa : any;
  
  liga: string = environment.API_URI_IMAGENES;
  constructor(private inventarioService : InventarioService,private excelService: ExcelService)
  {
    this.listarBolsa();
  }
  listarBolsa()
  {
      
    this.inventarioService.listarBolsas().subscribe((resBolsa: any) => {
      ///console.log(resBolsa);
      this.bolsa=resBolsa;
  },
      (err: any) => console.error(err)
    );
  }
  exportAsXLSX() {
    let element = document.getElementById('tablaBolsa');
    this.excelService.exportAsExcelFile(element, 'sample');
  }
}
