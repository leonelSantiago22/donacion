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
  constructor(private hospitalService:HospitalService){
    this.listHospitales();
  }
  listHospitales()
  {
    this.hospitalService.listHospital().subscribe((resCategorias: any) => {
      console.log(resCategorias);
      this.hospital=resCategorias;
  },
      (err: any) => console.error(err)
    );
  }
}
