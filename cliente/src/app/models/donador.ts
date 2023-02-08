export class Donador {
    iddonador: number;
    idpersona: number;
    tipodesangre: string;
    nombre: string;
    edad: number;
    genero: string;
     constructor() {
      this.iddonador = 0;
      this.idpersona = 0;
      this.nombre = "";
      this.tipodesangre = '';
      this.edad = 0;
      this.genero = "M/F";
    }
}
  