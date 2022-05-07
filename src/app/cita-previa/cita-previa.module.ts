import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendasComponent } from './agendas/agendas.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarioComponent } from './calendario/calendario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path:'**',component:AgendasComponent}
];

@NgModule({
  declarations: [
    AgendasComponent,
    CalendarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgbModule
  ],
  exports:[AgendasComponent,CalendarioComponent]
})
export class CitaPreviaModule { }
