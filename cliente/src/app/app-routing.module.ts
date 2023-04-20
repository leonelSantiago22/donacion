import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { BolsaComponent } from './components/bolsa/bolsa.component';
import { DonadoresComponent } from './components/donadores/donadores.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { MainComponent } from './components/main/main.component';
import { EnfermeraComponent } from './components/enfermera/enfermera.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { TransfucionesComponent } from './components/transfuciones/transfuciones.component';
import { HospitalComponent } from './components/hospital/hospital.component';
import { RegistrosComponent } from './components/registros/registros.component';
import { PersonaComponent } from './components/persona/persona.component';
import { DonacionComponent } from './components/donacion/donacion.component';
import { BancoComponent } from './components/banco/banco.component';
import { RecuperacionComponent } from './components/recuperacion/recuperacion.component';
import { SolicitudesAdministradoComponent } from './components/solicitudes-administrado/solicitudes-administrado.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'solicitud', 
    component: SolicitudComponent
  },
  {
    path: 'bolsa_de_sangre',
    component: BolsaComponent
  },
  {
    path: 'paciente',
    component: PacienteComponent
  },
  {
    path: 'donadores', 
    component: DonadoresComponent
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'enfermera',
    component: EnfermeraComponent
  },
  {
    path: 'inventario',
    component: InventarioComponent
  },
  {
    path: 'transfuciones',
    component: TransfucionesComponent
  },
  {
    path: 'hospital',
    component: HospitalComponent
  },
  {
    path: 'registros',
    component: RegistrosComponent
  },
  {
    path:'persona',
    component:PersonaComponent
  },
  {
    path : 'banco',
    component: BancoComponent
  },
  {
    path:'solicitudadministrador',
    component: SolicitudesAdministradoComponent
  },
  {
    path:'donacion',
    component: DonacionComponent
  },
  {
    path:'recuperacion/:token',
    component: RecuperacionComponent
  },
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
