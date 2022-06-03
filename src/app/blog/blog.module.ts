import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { NuevoPostComponent } from './nuevo-post/nuevo-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from '../shared/footer/footer.module';

const routes: Routes = [
  {path:'post',component:PostComponent},
  {path:'**',component:PrincipalComponent}
];

@NgModule({
  declarations: [
    PrincipalComponent,
    PostComponent,
    NuevoPostComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FooterModule,
    RouterModule.forChild(routes)
  ],
  exports:[NuevoPostComponent]
})
export class BlogModule { }
