import { Component } from '@angular/core';
import { Hospital } from 'src/app/models/hospital';

import { ExcelService } from 'src/app/services/excel.service';
import { environment } from 'src/app/environments/environment';

import { HospitalService } from 'src/app/services/hospital.service';
declare var  $:any;
@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent {
  hospital : any;
  hospitales:any;
  liga: string = environment.API_URI_IMAGENES;
  agregarHospitales : any;
  constructor(private hospitalService:HospitalService,private excelService: ExcelService){
    this.listHospitales();
  }
  ngOnInit()
  {
    this.hospitales = new Hospital();
    this.agregarHospitales  = new Hospital();
  }
  exportAsXLSX() {
    let element = document.getElementById('tablaHospital');
    this.excelService.exportAsExcelFile(element, 'sample');
  }
  listHospitales()
  {
    this.hospitalService.listHospital().subscribe((resHospital: any) => {
      //console.logresHospital);
      this.hospital=resHospital;
  },
      (err: any) => console.error(err)
    );
  }
  agregarHospital()
  {
    this.hospitalService.agregarHospital(this.agregarHospitales).subscribe((resHospital: any) => {
      //console.logresHospital);

      this.listHospitales();
  },
      (err: any) => console.error(err)
    );
  }
  eliminarHospital(idhospital:any)
  {
    this.hospitalService.deleteHosptital(idhospital).subscribe((resHospital: any) => {
      //console.logresHospital);
      this.hospitales=resHospital;
      this.listHospitales();
  },
      (err: any) => console.error(err)
    );
  }
  actualizarHospital()
  {
    this.hospitalService.actualizarHospial(this.hospitales).subscribe((resHospital: any) => {
      //console.logresHospital);
      this.hospitales=resHospital;
      this.listHospitales();
  },
      (err: any) => console.error(err)
    );
  }
  visualizarHospital(idhospital:any)
  {
    this.hospitalService.listOneHospital(idhospital).subscribe((resHospital: any) => {
      //console.logresHospital);
      this.hospitales=resHospital;
  },
      (err: any) => console.error(err)
    );
  }
  prepararAgregarHospital()
  {
    $('#mymodalAgregarHospital').modal({
      dismissible: false
      });
      $('#mymodalAgregarHospital').modal('open');
  } 
  prepararModificarHospital()
  {
    $('#mymodalModificar').modal({
      dismissible: false
      });
      $('#mymodalModificar').modal('open');
  }
}
