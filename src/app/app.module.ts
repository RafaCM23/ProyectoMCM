import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitaPreviaModule } from './cita-previa/cita-previa.module';
import { MainPageModule } from './main-page/main-page.module';
import { SharedModule } from './shared/shared.module';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainPageModule,
    SharedModule,
    CitaPreviaModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
