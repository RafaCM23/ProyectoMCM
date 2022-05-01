import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { AuthService } from "./auth/auth.service";

 
@Injectable({
    providedIn: 'root',
  })
  export class AuthGuard implements CanActivate, CanActivateChild {
      
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | any {
      let resp= this.authService.compruebaToken();
      if(resp==true){
        return true
      }else{
      Swal.fire({
        title:'Crecenciales Invalidas',
        text:'Acceda desde el login',
        icon: 'error',
        confirmButtonText:'Ok'
              }
            ).then(()=>{
              this.router.navigateByUrl("/admin/login");})
          }
      }
    
    canActivateChild(route: ActivatedRouteSnapshot, 

        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this.canActivate(route, state);

    }
}