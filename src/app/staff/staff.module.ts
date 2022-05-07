import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HubComponent } from './hub/hub.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { NuevosRegistrosComponent } from './nuevos-registros/nuevos-registros.component';
import { RegisterComponent } from '../registro/register/register.component';
import { AuthGuard } from '../AuthGuard';
import { MisDatosComponent } from './mis-datos/mis-datos.component';
import { FormsModule } from '@angular/forms';
import { DatosProfesionalesComponent } from './datos-profesionales/datos-profesionales.component';
import { CalendarioComponent } from '../cita-previa/calendario/calendario.component';
import { NuevoPostComponent } from '../blog/nuevo-post/nuevo-post.component';

const routes: Routes = [
  {path:'hub',canActivate:[AuthGuard],component:HubComponent,children:[
    {path:'nuevos-registros',component:NuevosRegistrosComponent},
    {path:'crea-nuevo',component:RegisterComponent},
    {path:'mis-datos',component:MisDatosComponent},
    {path:'mi-agenda',component:CalendarioComponent},
    {path:'datos-profesionales',component:DatosProfesionalesComponent},
    {path:'agendas-profesionales',component:CalendarioComponent},
    {path:'nuevo-post',component:NuevoPostComponent},
  ]},  
  
  {path:'**',redirectTo:'hub'}
];

@NgModule({
  declarations: [
    HubComponent,
    NuevosRegistrosComponent,
    MisDatosComponent,
    DatosProfesionalesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class StaffModule { }
