import { Component } from '@angular/core';
import { DonadorService } from 'src/app/services/donador.service';
import { Donador } from 'src/app/models/donador';
import { Persona } from 'src/app/models/persona';
import { EventEmitter } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { ExcelService } from 'src/app/services/excel.service';
import { environment } from 'src/app/environments/environment';

declare var $: any;
@Component({
  selector: 'app-donadores',
  templateUrl: './donadores.component.html',
  styleUrls: ['./donadores.component.css']
})
export class DonadoresComponent {
  donador : any;
  donadores:any;
  personas:any;
  liga:string = environment.API_URI_IMAGENES;
  constructor(private  donadorService: DonadorService, 
    private personaService: PersonaService,
    private router: Router,
    private comunicacionService :ComunicacionService,
    private excelService:ExcelService){
      this.listarDonadores();
    $('.mymodal').modal();
    this.comunicacionService.observador$.subscribe(
      (msg) =>
      {
        if(msg.componente == 2)
        {
          this.listarDonadores();
        }
      }
      );
      
  }
  ngOnInit()
  {
    this.donadores = new Donador();
    this.personas = new Persona();
  }
  eliminarDonador(iddonador:any){
    //console.log"eliminar categoria "+iddonador)
    this.donadorService.deleteDonadores(iddonador).subscribe((resCategorias: any) => {
      //console.logresCategorias);
      this.listarDonadores();
  },
      (err: any) => console.error(err)
    );
  }
  listarDonadores()
  {
    this.donadorService.listarDonadores().subscribe((resCategorias: any) => {
      //console.logresCategorias);
      this.donador=resCategorias
  },
      (err: any) => console.error(err)
    );
  }
  visualizarDonador(iddonador:any, idpaciente:any)
  {
    this.donadorService.listOne(iddonador, idpaciente).subscribe((resClientes: any) => {
      //console.logresClientes);
      this.donadores=resClientes;
  },
      (err: any) => console.error(err)
    );
  }
  agregarDonador()
  {
      //primero insertamos a la persona
      //console.logthis.donadores);
      this.donadorService.insertarDonador(this.donadores).subscribe((resClientes: any) => {
        //console.logresClientes);
        this.donadores=resClientes;
    },
        (err: any) => console.error(err)
      );
    this.listarDonadores();
  }

  listOnePaciente(idpaciente:any, idpersona:any)
  {
    this.donadorService.listOne(idpaciente,idpersona).subscribe((resClientes: any) => {
      //console.logresClientes);
      this.donador=resClientes;

  },
      (err: any) => console.error(err)
    );
  }
  actualizarDonador()
  {
    
    this.donadorService.updateDonadores(this.donadores).subscribe((resClientes: any) => {
      //console.logresClientes);
      this.donadores=resClientes;

  },
      (err: any) => console.error(err)
    );
    this.listarDonadores();
    
  }
  clear()
  {
    //console.log"clear");
    this.donadores.nombre = "";
    this.donadores.idpersona = "";
    this.donadores.tipodesangre = "";
    this.donadores.genero = "";
    this.donadores.edad = "";
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
    preparar2(){
      $('#mymodal2').modal({
            dismissible: false
      });
      $('#mymodal2').modal('open');
    }
    exportAsXLSX()
    {
      let element = document.getElementById("tabladonadores");
      this.excelService.exportAsExcelFile(element, 'sample');
    }
  
}
