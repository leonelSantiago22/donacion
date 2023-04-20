import { Component } from '@angular/core';
import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/models/paciente';
import { PersonaService } from 'src/app/services/persona.service';
import { Router } from '@angular/router';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { environment } from 'src/app/environments/environment';
import { SweetAlertArrayOptions } from 'sweetalert2';
import { ExcelService } from 'src/app/services/excel.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'
declare var $: any;
@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent {
  liga: string = environment.API_URI_IMAGENES;
  paciente: any;
  pacienteVar: any;
  uploadEvent: any;
  file: any;
  arrayBuffer: any
  exceljsondata: any;
  constructor(private pacienteService: PacienteService, private personaService: PersonaService, private router: Router,
    private comunicacionService: ComunicacionService,private excelService: ExcelService) {
    this.listarPacientes();
    this.comunicacionService.observador$.subscribe(
      (msg) => {
        if (msg.componente == 1) {
          this.listarPacientes();
        }
      }
    );
  }
  listarPacientes() {
    this.pacienteService.listPacientes().subscribe((resCategorias: any) => {
      console.log(resCategorias);
      this.paciente = resCategorias;
    },
      (err: any) => console.error(err)
    );
  }
  ngOnInit() {
    this.listarPacientes();
    this.pacienteVar = new Paciente();
  }
  visualizarPaciente(idpaciente: any, idpersona: any) {
    this.pacienteService.listOne(idpaciente, idpersona).subscribe((resClientes: any) => {
      console.log(resClientes);
      this.pacienteVar = resClientes;
    },
      (err: any) => console.error(err)
    );

  }
  exportAsXLSX() {
    let element = document.getElementById('tablapacientes');
    this.excelService.exportAsExcelFile(element, 'sample');
  }
  eliminarPaciente(idpaciente: any) {
    this.pacienteService.deletePacientes(idpaciente).subscribe((resPaciente: any) => {
      console.log(resPaciente);
      console.log(idpaciente);

      this.pacienteService.listPacientes().subscribe((resPaciente: any) => {
        console.log(resPaciente);
        this.paciente = resPaciente;
      },
        (err: any) => console.error(err)
      );
    },
      (err: any) => console.error(err)
    );
  }

  agregarPaciente() {
    this.pacienteService.insertPaciente(this.pacienteVar).subscribe((resClientes: any) => {
      console.log(resClientes);
      this.pacienteVar = resClientes;
      this.listarPacientes();
    },
      (err: any) => console.error(err)
    );
  }

  listOnePaciente(idpaciente: any, idpersona: any) {
    this.pacienteService.listOne(idpaciente, idpersona).subscribe((resClientes: any) => {
      console.log(resClientes);
      this.pacienteVar = resClientes;
    },
      (err: any) => console.error(err)
    );
  }

  actualizarPaciente() {
    console.log(this.pacienteVar)
    this.pacienteService.updatePaciente(this.pacienteVar).subscribe((resPaciente: any) => {
      console.log(resPaciente);
      this.pacienteVar = resPaciente;
      this.listarPacientes();
    },
      (err: any) => console.error(err)
    );
  }
  changeDonadores() {
    this.router.navigate(['donadores']);
  }
  changeSolicitud() {
    this.router.navigate(['solicitud']);
  }
  preparar() {
    $('#mymodal').modal({
      dismissible: false
    });
    $('#mymodal').modal('open');
  }
  preparar2() {
    $('#mymodal2').modal({
      dismissible: false
    });
    $('#mymodal2').modal('open');
  }

  cargarExcelProfesor(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.uploadEvent = event;
    }
    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array(); 
      for (var i = 0; i != data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.exceljsondata = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.migrarProfesor2DB();
    }
  }
  
  
  migrarProfesor2DB() {
    let i = 0;
    this.exceljsondata.map((profesor: any) => {
      console.log("datos", this.exceljsondata[i]);
      this.pacienteVar = this.exceljsondata[i];
      this.agregarPaciente();
      i++;
      // this.profesorService.guardarProfesor(profesor).subscribe((resProfesor) =>{},err =>{console.log(err);})
    })
    

    $('#migrarProfesor').modal({ dismissible: false });
    $('#migrarProfesor').modal('close');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Profesores Migrados',
      confirmButtonAriaLabel: 'Thumbs up, great!'
    })
  }
  
  migrarProfesor() {
    $('#migrarProfesor').modal({ dismissible: false });
    $('#migrarProfesor').modal('open');
  }
}
