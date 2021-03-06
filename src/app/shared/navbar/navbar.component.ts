import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  llevaNavbar(){
    if(this.router.url.toString().startsWith("/admin") || this.router.url.toString().startsWith("/staff")){
      return false;
    }
    else{
      return true;}
  }
}
