import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { CarritoInterface } from 'src/app/interfaces/carrito/carrito-interface';
import { LstorageService } from 'src/app/servicios/carrito/lstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  carrito: CarritoInterface[] = [];
  numProductos: number = 0;

  constructor(private router: Router, private lstorageservicio: LstorageService) {
    if(!this.loggedIn()) {
      /*this.router.navigate(['']);
    } else {*/
      this.router.navigate(['login']);
    }
    this.carrito = this.lstorageservicio.getCarrito();
    this.numProductos = this.lstorageservicio.getCantidadItems();
    this.sincronizarCarrito();
  }
  
  title = 'ofshop';

  loggedIn(){
    return localStorage.getItem('token');
  }

  logout(){
    alert("Logged out");
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  carro(){
    if (this.numProductos > 0 ){
      return true
    }
    return false; 
  }
  
  sincronizarCarrito(){
    this.lstorageservicio.numProductos.subscribe(
      data => this.numProductos = data
    );
  }

}
