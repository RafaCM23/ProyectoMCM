import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HubComponent } from './hub/hub.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { NuevosRegistrosComponent } from './nuevos-registros/nuevos-registros.component';
import { RegisterComponent } from '../registro/register/register.component';
import { AuthGuard } from '../AuthGuard';

const routes: Routes = [
  {path:'hub',canActivate:[AuthGuard],component:HubComponent,children:[
    {path:'nuevos-registros',component:NuevosRegistrosComponent},
    {path:'crea-nuevo',component:RegisterComponent},
  ]},  
  {path:'**',redirectTo:'hub'}
];

@NgModule({
  declarations: [
    HubComponent,
    NuevosRegistrosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class StaffModule { }
