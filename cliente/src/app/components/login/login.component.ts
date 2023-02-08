
import { Component } from '@angular/core';
import Swal from "sweetalert2";
import { Router } from '@angular/router';
//importamos el servicio
import { UsuarioService } from '../../services/usuario.service';
import { Enfermera } from "../../models/enfermera";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //creamos la varible
  enfermera = new Enfermera();
  constructor(private usuarioService: UsuarioService, private router: Router) {

  }
  verificarEnfermera() {
    console.log(this.enfermera.numero_trabajador);
    console.log(this.enfermera.password);
    
    this.usuarioService.VerificarEnfermera(this.enfermera.numero_trabajador, this.enfermera.password).subscribe((resUsuario: any) => {
      console.log(resUsuario);
    if (resUsuario == null){
      console.log("el trabajador no existe")
      this.usuarioService.VerificarAdministrador(this.enfermera.numero_trabajador, this.enfermera.password).subscribe((resUsuario: any) => {
        console.log(resUsuario);
      if (resUsuario == null){
        console.log("el trabajador no existe")
        
        Swal.fire({
          position:"center",
          icon:"error",
          title:"Número de trabajador o contraseña inválido",
          showConfirmButton:true
        })
      }else{
        console.log("el usuario existe");
        this.router.navigate(['enfermera']);
      }
        },
        (err: any) => console.error(err)
      );
    }else{
      console.log("el usuario existe");
      this.router.navigate(['main']);
    }
},
      (err: any) => console.error(err)
    );
  }
}