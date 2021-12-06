import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { BusquedaProductoServicioService } from 'src/app/servicios/productos/busqueda-producto-servicio.service';

import { ProductoInterface } from 'src/app/interfaces/productos/producto-interface';

import { BusquedaProductoModel } from 'src/app/clases/productos/busqueda-producto-model';

import {render} from 'creditcardpayments/creditCardPayments';

//import {RastreoProductoService} from '../../servicios/rastreo/rastreo-producto.service';

import { CarritoInterface } from 'src/app/interfaces/carrito/carrito-interface';

import { LstorageService } from 'src/app/servicios/carrito/lstorage.service';

import { TotalesInterface } from 'src/app/interfaces/carrito/totales-interface';

@Component({
  selector: 'app-pagina-compra-productos',
  templateUrl: './pagina-compra-productos.component.html',
  styleUrls: ['./pagina-compra-productos.component.css']
})
export class PaginaCompraProductosComponent implements OnInit {

  registro: TotalesInterface = {
    "quantity": 0,
    "subtotal": 0,
    "envio": 0,
    "total": 0
  };
  bskModel = new BusquedaProductoModel('');
  carga: boolean = false;
  carrito: CarritoInterface[] = [];


  constructor(
    private busquedaservicio:BusquedaProductoServicioService,
    private lstorageservicio: LstorageService
    //private rastreo:RastreoProductoService
  ) {
    
  }

  ngOnInit(): void {
    this.carrito = this.lstorageservicio.getCarrito();
    console.log(this.carrito);
    this.registro.quantity = 0;
    this.registro.subtotal = 0;
    this.registro.envio = 0;
    for(var i=0; i < this.carrito.length; i++){
      this.registro.quantity += this.carrito[i].quantity;
      this.registro.subtotal += this.carrito[i].subtotal*this.carrito[i].quantity;
      //console.log(this.carrito[i]);
    }
    this.registro.total = this.registro.subtotal + this.registro.envio;
    console.log("total: "+String(this.registro.total));
    this.pagoPaypal(this.registro.total, true);
  }

  pagoPaypal = (price:any, isInit:boolean)=>{
    $("#paypal").html("");
    if(price > 0) {
      render({
        id:"#paypal",
        currency:"MXN",
        value: this.numberWithCommas(price),
        onApprove:(details)=>{
          console.log("aprovado");
          console.log(details);
          console.log("aprovado");
        }
      })
    }
  }

  /*sendQuery = () => {
    this.busquedaservicio.busqueda(this.bskModel.q).then( (response) => {
      console.log(response);
      response.price = Math.round((((response.code/1000000000000) + 50) + Number.EPSILON) * 100) / 100;
      response.price_f = '$ ' + this.numberWithCommas(response.price) + ' MXN.';
      this.registro =  response;
      console.log(response);
      this.carga = true;
    }, (error) => {
      alert("error: " + error.statusText );
    })

  }*/

  numberWithCommas(x: number):string{
      return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  menos(x: CarritoInterface, index: number){
    //console.log(index);
    /*if(x.quantity!=1){
      this.carrito[index].quantity = x.quantity-1;
      this.registro.quantity -= 1;
    }*/
    console.log("Disminuyendo cantidad.");
    //console.log(this.lstorageservicio.getCantidadItems());
    if(x.quantity>1){
      this.carrito[index].quantity = this.carrito[index].quantity-1;
      this.registro.quantity -= 1;
      this.registro.subtotal -= this.carrito[index].product.price;
      this.registro.total = this.registro.subtotal + this.registro.envio;
      this.registro.subtotal = Number(this.registro.subtotal.toFixed(2));
      this.registro.total = Number(this.registro.total.toFixed(2));
      /*console.log(this.carrito[index].quantity);
      console.log(this.registro.quantity );
      console.log(this.carrito);*/
      //console.log(cart);
    }
    //this.lstorageservicio.getCantidadItems();
    //localStorage.setItem('carrito2', JSON.stringify(this.carrito));
    this.lstorageservicio.actualizarCarrito(this.carrito);
    console.log("Producto disminuido.");
    this.pagoPaypal(this.registro.total, false);
  }

  mas(x: CarritoInterface, index: number){
    console.log("Incrementando cantidad.");
 
    //var cart = this.lstorageservicio.getCarrito();
    //var cantidad = this.lstorageservicio.getCantidadItems();
    //if(cantidad!=1){
    if(x.quantity>0){
      this.carrito[index].quantity = this.carrito[index].quantity+1;
      this.registro.quantity += 1;
      this.registro.subtotal += this.carrito[index].product.price;
      this.registro.total = this.registro.subtotal + this.registro.envio;
      this.registro.subtotal = Number(this.registro.subtotal.toFixed(2));
      this.registro.total = Number(this.registro.total.toFixed(2));
     /*console.log(this.carrito[index].quantity);
      console.log(this.registro.quantity );
      console.log(this.carrito);*/
      //console.log(cart);
    }
    //this.lstorageservicio.getCantidadItems();
    //localStorage.setItem('carrito2', JSON.stringify(this.carrito));
    this.lstorageservicio.actualizarCarrito(this.carrito);
    console.log("Producto incrementado.");
    this.pagoPaypal(this.registro.total, false);
  }

  eliminarProducto(index: number){
    console.log("Eliminando producto del carrito.");

    this.carrito.splice(index, 1 );
    this.lstorageservicio.actualizarCarrito(this.carrito);
    this.carrito = this.lstorageservicio.getCarrito();
    this.registro.quantity = 0;
    this.registro.subtotal = 0;
    this.registro.envio = 0;
    if(this.carrito != null){
      for(var i=0; i < this.carrito.length; i++){
        this.registro.quantity += this.carrito[i].quantity;
        this.registro.subtotal += this.carrito[i].subtotal*this.carrito[i].quantity;
        //console.log(this.carrito[i]);
      }
      this.registro.total = this.registro.subtotal + this.registro.envio;
      this.registro.total = Number(this.registro.total.toFixed(2));
    }

    console.log("Producto eliminado del carrito.");
    this.pagoPaypal(this.registro.total, false);
  }

  
  vaciarCarrito(){
    console.log("Vaciando carrito.");
    this.lstorageservicio.eliminarCarrito();
    this.registro.quantity = 0;
    this.registro.subtotal = 0;
    this.registro.total = 0;
    this.registro.envio = 0;
    console.log("Carrito vaciado.");
    this.pagoPaypal(this.registro.total, false);
  }

}
