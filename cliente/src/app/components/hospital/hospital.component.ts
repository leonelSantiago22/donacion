import { Component } from '@angular/core';
import { Hospital } from 'src/app/models/hospital';
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
  agregarHospitales : any;
  constructor(private hospitalService:HospitalService){
    this.listHospitales();
  }
  ngOnInit()
  {
    this.hospitales = new Hospital();
    this.agregarHospitales  = new Hospital();
  }
  listHospitales()
  {
    this.hospitalService.listHospital().subscribe((resHospital: any) => {
      console.log(resHospital);
      this.hospital=resHospital;
  },
      (err: any) => console.error(err)
    );
  }
  agregarHospital()
  {
    this.hospitalService.agregarHospital(this.agregarHospitales).subscribe((resHospital: any) => {
      console.log(resHospital);

      this.listHospitales();
  },
      (err: any) => console.error(err)
    );
  }
  eliminarHospital(idhospital:any)
  {
    this.hospitalService.deleteHosptital(idhospital).subscribe((resHospital: any) => {
      console.log(resHospital);
      this.hospitales=resHospital;
      this.listHospitales();
  },
      (err: any) => console.error(err)
    );
  }
  actualizarHospital()
  {
    this.hospitalService.actualizarHospial(this.hospitales).subscribe((resHospital: any) => {
      console.log(resHospital);
      this.hospitales=resHospital;
      this.listHospitales();
  },
      (err: any) => console.error(err)
    );
  }
  visualizarHospital(idhospital:any)
  {
    this.hospitalService.listOneHospital(idhospital).subscribe((resHospital: any) => {
      console.log(resHospital);
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
