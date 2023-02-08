import { Component } from '@angular/core';
import { DonadorService } from 'src/app/services/donador.service';
import { Donador } from 'src/app/models/donador';
import { Persona } from 'src/app/models/persona';
import { EventEmitter } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-donadores',
  templateUrl: './donadores.component.html',
  styleUrls: ['./donadores.component.css']
})
export class DonadoresComponent {
  donador : any;
  donadores = new Donador();
  personas = new Persona();
  idpersona:any;
  constructor(private  donadorService: DonadorService, private personaService: PersonaService,private router: Router){
    this.listarDonadores();
    $('.mymodal').modal();
  
  }
  
  eliminarDonador(iddonador:any){
    console.log("eliminar categoria "+iddonador)
    this.donadorService.deleteDonadores(iddonador).subscribe((resCategorias: any) => {
      console.log(resCategorias);
      this.listarDonadores();
  },
      (err: any) => console.error(err)
    );
  }
  listarDonadores()
  {
    this.donadorService.listarDonadores().subscribe((resCategorias: any) => {
      console.log(resCategorias);
      this.donador=resCategorias
  },
      (err: any) => console.error(err)
    );
  }
  visualizarDonador(iddonador:any, idpaciente:any)
  {
    this.donadorService.listOne(iddonador, idpaciente).subscribe((resClientes: any) => {
      console.log(resClientes);
      this.donadores=resClientes;
      this.personas = resClientes;
  },
      (err: any) => console.error(err)
    );
    this.preparar();
  }
  agregarDonador()
  {
      //primero insertamos a la persona
    this.personaService.agregarPersona(this.personas).subscribe((resDonadores: any) => {
        console.log(resDonadores);
        this.personas = resDonadores;
      },
    (err: any) => console.error(err)
    );
    this.personaService.listPersonaMax().subscribe((resDonadores: any) => {
      console.log(resDonadores); 
      console.log(resDonadores[0].idpersona);
      
    },
      (err: any) => console.error(err)
    );

    /*
    this.donadorService.insertarDonador(this.donadores).subscribe((resPaciente: any) => {
      console.log(resPaciente);
      this.donador = resPaciente;
  },
      (err: any) => console.error(err)
    );*/
    
  }

  listOnePaciente(idpaciente:any, idpersona:any)
  {
    this.donadorService.listOne(idpaciente,idpersona).subscribe((resClientes: any) => {
      console.log(resClientes);
      this.donador=resClientes;

  },
      (err: any) => console.error(err)
    );
  }
  actualizarDonador()
  {
    this.donadorService.updateDonadores(this.donadores).subscribe((resPaciente: any) => {
      console.log(resPaciente);
      this.donadores = resPaciente;
  },
      (err: any) => console.error(err)
    );
    this.personaService.updatePersona(this.personas).subscribe((resPersona: any) => {
      console.log(resPersona);
      this.personas = resPersona;
     },
      (err: any) => console.error(err)
    );
    this.listarDonadores();
    
  }
  clear()
  {
    console.log("clear");
    this.donadores.nombre = "";
  } 
  changePaciente()
    {
      this.router.navigate(['paciente']);
    }
  static()
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
}
