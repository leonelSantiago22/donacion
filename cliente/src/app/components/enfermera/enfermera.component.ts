import { Component } from '@angular/core';
import { Enfermera } from 'src/app/models/enfermera';
import { EnfermeraService } from 'src/app/services/enfermera.service';
import { JQueryStyleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from 'src/app/models/persona';
import { environment } from 'src/app/environments/environment';
import { CorreoServiceService } from 'src/app/services/correo-service.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { ExcelService } from 'src/app/services/excel.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-enfermera',
  templateUrl: './enfermera.component.html',
  styleUrls: ['./enfermera.component.css'],
})
export class EnfermeraComponent {
  enfermera: any;
  enfermeras: any;
  liga: string = environment.API_URI_IMAGENES;
  personas: any;
  enfermerasAgregar: any;
  imgPrincipal: any;
  fileToUpload: any;
  numero_trabajador: any;
  uploadEvent: any;
  file: any;
  arrayBuffer: any
  exceljsondata: any;
  pageSize = 3;
  p = 1;
  ngOnInit() {
    this.personas = new Persona();
    this.enfermeras = new Enfermera();
    this.enfermerasAgregar = new Enfermera();
  }
  constructor(
    private enfermeraService: EnfermeraService,
    private router: Router,
    private personaServices: PersonaService,
    private imagenesService: ImagenesService,
    private correoService: CorreoServiceService,
    private excelService: ExcelService
  ) {
    this.listarEnfermeras();
    this.maxima();
  }
  listarEnfermeras() {
    this.maxima();
    this.enfermeraService.listEnfermera().subscribe(
      (resEnfermera: any) => {
        ////console.logresEnfermera);
        this.enfermera = resEnfermera;
      },
      (err: any) => console.error(err)
    );
  }
  eliminarEnfermera(numero_trabajador: any) {
    this.enfermeraService.deleteEnfermera(numero_trabajador).subscribe(
      (resEnfermera: any) => {
        ////console.logresEnfermera);
        this.enfermeras = resEnfermera;
        this.listarEnfermeras();
      },
      (err: any) => console.error(err)
    );
  }
  visualizarEnfermera(numero_trabajador: any, idpersona: any) {
    this.enfermeraService
      .listOneEnfermera(numero_trabajador, idpersona)
      .subscribe(
        (resEnfermera: any) => {
          ////console.logresEnfermera);
          this.enfermeras = resEnfermera;
        },
        (err: any) => console.error(err)
      );
  }
  actualizarEnfermera() {
    this.enfermeraService.updateEnfermera(this.enfermeras).subscribe(
      (resEnfermera: any) => {
        ////console.logresEnfermera);
        this.enfermeras = resEnfermera;
        this.listarEnfermeras();
      },
      (err: any) => console.error(err)
    );
  }
  agregarEnfermera() {
    this.enfermeraService.agregarEnfermera(this.enfermerasAgregar).subscribe(
      (resEnfermera: any) => {
        ////console.logresEnfermera.getIdPersona[0].idp);
        ////console.logresEnfermera);
        this.enfermeras = resEnfermera;
        this.listarEnfermeras();
      },
      (err: any) => console.error(err)
    );
  }
  visualizarPersona(idpersona: any) {
    this.personaServices.listOnePersona(idpersona).subscribe(
      (resPersona: any) => {
        ////console.logresPersona);
        this.enfermeras = resPersona;
      },
      (err: any) => console.error(err)
    );
  }
  maxima() {
    this.enfermeraService.maxima().subscribe(
      (resEnfermera: any) => {
        ////console.logresEnfermera.validar);
        this.numero_trabajador = resEnfermera.validar;
      },
      (err: any) => console.error(err)
    );
  }
  prepararModificar() {
    $('#mymodalModificar').modal({
      dismissible: false,
    });
    $('#mymodalModificar').modal('open');
  }
  prepararAgregar() {
    $('#mymodalAgregar').modal({
      dismissible: false,
    });
    $('#mymodalAgregar').modal('open');
  }
  static() {
    this.router.navigate(['enfermera']);
  }

  cargandoImagen(files: any, carpeta: any) {
    ////console.logfiles.files[0]);
    this.imgPrincipal = null;
    this.fileToUpload = files.files[0];
    let imgPromise = this.getFileBlob(this.fileToUpload);
    imgPromise.then((blob) => {
      ////console.logblob);

      this.imagenesService.guardarImagen(this.numero_trabajador + 1, blob, carpeta).subscribe(
        (res: any) => {
          this.imgPrincipal = blob;
        },
        (err) => console.error(err)
      );
    });
  }

  getFileBlob(file: any) {
    var reader = new FileReader();
    return new Promise(function (resolve, reject) {
      reader.onload = (function (thefile) {
        return function (e: any) {
          resolve(e.target.result);
        };
      })(file);
      reader.readAsDataURL(file);
    });
  }
  noFoundImage(event: any) {
    event.target.src = this.liga + '/perfil/345.jpg';
  }
  dameNombre(id: any) {
    ////////console.log'hola');
    return this.liga + '/perfil/' + id + '.jpg';
  }
  exportAsXLSX() {
    let element = document.getElementById('tabla');
    this.excelService.exportAsExcelFile(element, 'sample');
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
      //////console.log"datos", this.exceljsondata[i]);
      this.enfermerasAgregar = this.exceljsondata[i]
      this.agregarEnfermera();
      i++;
      // this.profesorService.guardarProfesor(profesor).subscribe((resProfesor) =>{},err =>{////console.logerr);})
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