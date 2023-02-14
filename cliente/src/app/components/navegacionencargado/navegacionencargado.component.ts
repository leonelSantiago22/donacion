import { Component } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital.service';
import { EnfermeraService } from 'src/app/services/enfermera.service';
import { BancoService } from 'src/app/services/banco.service';
import { Hospital } from 'src/app/models/hospital';
import { Enfermera } from 'src/app/models/enfermera';
import { Bancos } from 'src/app/models/banco';
declare var $ : any;
@Component({
  selector: 'app-navegacionencargado',
  templateUrl: './navegacionencargado.component.html',
  styleUrls: ['./navegacionencargado.component.css']
})
export class NavegacionencargadoComponent {
  agregarHospitales : any;
  enfermerasAgregar:any;
  bancosAgregar : any;
  constructor(private hospitalService:HospitalService,
              private enfermeraService:EnfermeraService,
              private bancoService:BancoService)
      {}

      //elementos para hospital
      agregarHospital()
      {
        this.hospitalService.agregarHospital(this.agregarHospitales).subscribe((resHospital: any) => {
          console.log(resHospital);
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
      ngOnInit()
      {
        $(document).on('focus','.dropdown-trigger',function(){
          $('.dropdown-trigger').dropdown();
          });
          this.agregarHospitales = new Hospital();
          this.enfermerasAgregar = new Enfermera();
          this.bancosAgregar = new Bancos();
      }

      agregarEnfermera()
      {
        this.enfermeraService.agregarEnfermera(this.enfermerasAgregar).subscribe((resEnfermera: any) => {
          console.log(resEnfermera);
          this.enfermerasAgregar = resEnfermera;
          },
          (err: any) => console.error(err)
        );
      }
      prepararAgregarEnfermera(){
      $('#mymodalAgregarEnfermera').modal({
            dismissible: false
      });
      $('#mymodalAgregarEnfermera').modal('open');
      }
      agregarBanco()
        {
          this.bancoService.agregarBanco(this.bancosAgregar).subscribe((resBanco: any) => {
            console.log(resBanco);
            this.bancosAgregar  = resBanco;
        },
            (err: any) => console.error(err)
          );
        }
        prepararAgregarBanco(){
          $('#mymodalAgregarBanco').modal({
                dismissible: false
          });
          $('#mymodalAgregarBanco').modal('open');
        }
        
}
