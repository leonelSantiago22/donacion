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
declare var $: any;
@Component({
  selector: 'app-enfermera',
  templateUrl: './enfermera.component.html',
  styleUrls: ['./enfermera.component.css'],
})
export class EnfermeraComponent {
  enfermera: any;
  enfermeras: any;
  liga:string = environment.API_URI_IMAGENES;
  personas: any;
  enfermerasAgregar: any;
  imgPrincipal: any;
  fileToUpload: any;
  numero_trabajador : any;
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
    private correoService: CorreoServiceService
  ) {
    this.listarEnfermeras();
    this.maxima();
  }
  listarEnfermeras() {
    this.maxima();
    this.enfermeraService.listEnfermera().subscribe(
      (resEnfermera: any) => {
        console.log(resEnfermera);
        this.enfermera = resEnfermera;
      },
      (err: any) => console.error(err)
    );
  }
  eliminarEnfermera(numero_trabajador: any) {
    this.enfermeraService.deleteEnfermera(numero_trabajador).subscribe(
      (resEnfermera: any) => {
        console.log(resEnfermera);
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
          console.log(resEnfermera);
          this.enfermeras = resEnfermera;
        },
        (err: any) => console.error(err)
      );
  }
  actualizarEnfermera() {
    this.enfermeraService.updateEnfermera(this.enfermeras).subscribe(
      (resEnfermera: any) => {
        console.log(resEnfermera);
        this.enfermeras = resEnfermera;
        this.listarEnfermeras();
      },
      (err: any) => console.error(err)
    );
  }
  agregarEnfermera() {
    this.enfermeraService.agregarEnfermera(this.enfermerasAgregar).subscribe(
      (resEnfermera: any) => {
        console.log(resEnfermera.getIdPersona[0].idp);
        console.log(resEnfermera);
        this.enfermeras = resEnfermera;
        this.listarEnfermeras();
      },
      (err: any) => console.error(err)
    );
  }
  visualizarPersona(idpersona: any) {
    this.personaServices.listOnePersona(idpersona).subscribe(
      (resPersona: any) => {
        console.log(resPersona);
        this.enfermeras = resPersona;
      },
      (err: any) => console.error(err)
    );
  }
  maxima() {
    this.enfermeraService.maxima().subscribe(
      (resEnfermera: any) => {
        console.log(resEnfermera.validar);
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
    console.log(files.files[0]);
    this.imgPrincipal = null;
    this.fileToUpload = files.files[0];
    let imgPromise = this.getFileBlob(this.fileToUpload);
    imgPromise.then((blob) => {
      console.log(blob);

      this.imagenesService.guardarImagen(this.numero_trabajador+1, blob, carpeta).subscribe(
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
    console.log('hola');
    return this.liga + '/perfil/' + id + '.jpg';
  }
}
