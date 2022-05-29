import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancelarCitaComponent } from './cancelar-cita/cancelar-cita.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [

  {path:'cita',component:CancelarCitaComponent}
  
];


@NgModule({
  declarations: [
    CancelarCitaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CancelarCitaModule { }
