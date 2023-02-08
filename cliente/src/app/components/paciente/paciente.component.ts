import { Component } from '@angular/core';
import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/models/paciente'; 
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { Router } from '@angular/router';
declare var  $:any;
@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent {
  paciente :any;
  personas = new Persona();
  pacienteVar = new Paciente();
  constructor(private pacienteService: PacienteService, private personaService: PersonaService, private router: Router){
    this.pacienteService.listPacientes().subscribe((resCategorias: any) => {
      console.log(resCategorias);
      this.paciente=resCategorias;
  },
      (err: any) => console.error(err)
    );
  }

  visualizarPaciente(idpaciente:any, idpersona:any)
  {
    this.pacienteService.listOne(idpaciente,idpersona).subscribe((resClientes: any) => {
      console.log(resClientes);
      this.pacienteVar=resClientes;
      this.personas = resClientes;
  },
      (err: any) => console.error(err)
    );

  }
  eliminarPaciente(idpaciente:any){
    this.pacienteService.deletePacientes(idpaciente).subscribe((resPaciente: any) => {
      console.log(resPaciente);
      console.log(idpaciente);
  
      this.pacienteService.listPacientes().subscribe((resPaciente: any) => {
        console.log(resPaciente);
        this.paciente=resPaciente;
    },
        (err: any) => console.error(err)
      );
  },
      (err: any) => console.error(err)
    );
  }

  agregarPaciente()
  {
    console.log(this.pacienteVar);
    this.pacienteService.insertPaciente(this.pacienteVar).subscribe((resPaciente: any) => {
      console.log(resPaciente);
      this.paciente = resPaciente;
  },
      (err: any) => console.error(err)
    );
  } 

  listOnePaciente(idpaciente:any, idpersona:any)
  {
    this.pacienteService.listOne(idpaciente,idpersona).subscribe((resClientes: any) => {
      console.log(resClientes);
      this.paciente=resClientes;
      this.personas = resClientes;
  },
      (err: any) => console.error(err)
    );
  }
  
  actualizarPaciente()
  {
    console.log(this.pacienteVar)
    this.pacienteService.updatePaciente(this.pacienteVar).subscribe((resPaciente: any) => {
      console.log(resPaciente);
      this.pacienteVar = resPaciente;
  },
      (err: any) => console.error(err)
    );
  } 
  changeDonadores()
    {
      this.router.navigate(['donadores']);
    }
  changeSolicitud()
    {
      this.router.navigate(['solicitud']);
    }
    preparar(){
      $('#mymodal').modal({
            dismissible: false
      });
      $('#mymodal').modal('open');
    }
    preparar2(){
      $('#mymodal2').modal({
            dismissible: false
      });
      $('#mymodal2').modal('open');
    }
}
