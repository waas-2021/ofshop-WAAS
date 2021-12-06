import { Injectable } from '@angular/core';
import { PaginaNoEncontradaComponent } from 'src/app/componentes/pagina-no-encontrada/pagina-no-encontrada.component';

import { CarritoInterface } from 'src/app/interfaces/carrito/carrito-interface';
import { ProductoInterface } from 'src/app/interfaces/productos/producto-interface';

import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LstorageService {

  carrito: CarritoInterface[] = [];
  numProductos: Subject<number> = new BehaviorSubject<number>(0);
  

  constructor() { }

  getCarrito(){
    var getLocal= localStorage.getItem('carrito');
    if(getLocal != null ){
      var getLocalStorage= JSON.parse(getLocal);
      this.carrito = getLocalStorage.productos
      this.numProductos.next(this.getCantidadItems());
    }
    
    return this.carrito;
  }

  getCantidadItems(){
    console.log("getCantidadItems():" )
   /* var cart = this.getCarrito();
    console.log("GETCARRITO(): "+ cart);
    console.log(this.carrito);*/

   // this.getCarrito();
    var cantidadProductos=0;
    for(var i=0; i < this.carrito.length; i++){
      cantidadProductos += this.carrito[i].quantity;
    }
    return cantidadProductos;
  }

  getSubtotal(){
    //this.getCarrito();
    var costo=0;
     for(var i=0; i < this.carrito.length; i++){
       costo += this.carrito[i].quantity * this.carrito[i].subtotal;
       this.carrito[i].subtotal = Number(this.carrito[i].subtotal.toFixed(2));
     }
 
    return costo.toFixed(2);
  }

  buscarEnCarrito(carro: CarritoInterface){
    var index = -1;
    for(var i=0; i < this.carrito.length; i++){
      if(carro.product.code == this.carrito[i].product.code){
        //console.log("ENCONTRADO");
        index = i;
        break;
      }
    }
    //console.log("ES: "+index);
    return index;
  }

  actualizarCarrito(carro: CarritoInterface[]){
    //console.log(carro);
    this.carrito = carro;
    var canasta = {
      "cantidad": this.getCantidadItems(),
      "productos": this.carrito,
      "total": this.getSubtotal(),
    };
    localStorage.setItem('carrito', JSON.stringify(canasta));
    this.numProductos.next(this.getCantidadItems());
  }

  addProducto(carro: CarritoInterface){
    //console.log(this.carrito);
    var index = this.buscarEnCarrito(carro); 
    if(this.carrito.length==0 || index == -1){
      //this.carrito= this.getCarrito();
      this.carrito.push(carro);
      //console.log("PUSH"+this.carrito.length);
      // this.getCantidadItems(); 
      /*var costo=0;
      var cantidadProductos=0;
      for(var i=0; i < this.carrito.length; i++){
        costo += this.carrito[i].subtotal;
        cantidadProductos += this.carrito[i].quantity;
      }
      console.log("QTY: " + this.getCantidadItems() + " SUBT: " + this.getSubtotal());

      var canasta = {
        "cantidad": cantidadProductos,
        "productos": this.carrito,
        "total": costo,
      };*/

      var canasta = {
        "cantidad": this.getCantidadItems(),
        "productos": this.carrito,
        "total": this.getSubtotal(),
      };

      localStorage.setItem('carrito', JSON.stringify(canasta));
      //console.log("LISTA: " + canasta);
    }
    else{
      //console.log("ELSE");
      this.carrito[index].quantity += 1;
      this.actualizarCarrito(this.carrito);
    }
    this.numProductos.next(this.getCantidadItems());

  }

  eliminarCarrito(){
    //console.log("ANTES: " + this.carrito);
    for(var i=0; i < this.carrito.length; i++){
      this.carrito.pop();
    }
    this.carrito.pop();
    localStorage.removeItem('carrito');
    this.numProductos.next(this.getCantidadItems());
  }

}
