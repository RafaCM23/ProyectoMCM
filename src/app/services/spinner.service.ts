import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {


  cargando = new Subject<boolean>();
  constructor() { }

  show(){   this.cargando.next(true);  }
  hide(){   this.cargando.next(false); }
}
