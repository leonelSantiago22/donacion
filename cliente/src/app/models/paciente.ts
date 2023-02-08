export class Paciente {
    idpaciente: number;
    idpersona: number;
    tipodesangre: string;
    nombre: string;
    edad: number;
    genero: string;
     constructor() {
      this.idpaciente = 0;
      this.idpersona = 0;
      this.tipodesangre = 'O-Rh+';
      this.nombre =  "";
      this.edad = 0;
      this.genero = 'M/F'
    }
  }
  