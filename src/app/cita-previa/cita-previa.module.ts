import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendasComponent } from './agendas/agendas.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'**',component:AgendasComponent}
];

@NgModule({
  declarations: [
    AgendasComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[AgendasComponent]
})
export class CitaPreviaModule { }
