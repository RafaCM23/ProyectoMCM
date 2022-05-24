import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';
import { NutricionComponent } from './nutricion/nutricion.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { BlogComponent } from './blog/blog.component';
import { PedirCitaComponent } from './pedir-cita/pedir-cita.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [

  {path:'',component:MainPageComponent}
  
];

@NgModule({
  declarations: [
    MainPageComponent,
    CarouselComponent,
    NutricionComponent,
    ServiciosComponent,
    ComentariosComponent,
    BlogComponent,
    PedirCitaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MainPageModule { }
