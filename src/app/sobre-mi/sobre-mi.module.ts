import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SobreMiComponent } from './sobre-mi/sobre-mi.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'**',component:SobreMiComponent}
];

@NgModule({
  declarations: [
    SobreMiComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SobreMiModule { }
