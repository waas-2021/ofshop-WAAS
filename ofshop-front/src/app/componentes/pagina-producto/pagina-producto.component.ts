import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { BusquedaProductoServicioService } from 'src/app/servicios/productos/busqueda-producto-servicio.service';

import { ProductoInterface } from 'src/app/interfaces/productos/producto-interface';

import { BusquedaProductoModel } from 'src/app/clases/productos/busqueda-producto-model';

import { LstorageService } from 'src/app/servicios/carrito/lstorage.service';

@Component({
  selector: 'app-pagina-producto',
  templateUrl: './pagina-producto.component.html',
  styleUrls: ['./pagina-producto.component.css']
})
export class PaginaProductoComponent implements OnInit {

  registro!: ProductoInterface;
  bskModel = new BusquedaProductoModel('');
  carga: boolean = false;

  constructor(
  private ruta:ActivatedRoute,
    private rutar:Router,
    private busquedaservicio:BusquedaProductoServicioService,
    private lstorageservicio: LstorageService
  ) { 
    this.ruta.params.subscribe(params=>{
      this.bskModel.q = params['id'];
    });
  }

  ngOnInit(): void {
    this.sendQuery();
  }

  sendQuery = () => {
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

  }

  numberWithCommas(x: number):string{
      return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  agregarACarrito(){
 
     localStorage.getItem('carrito');
     
     this.lstorageservicio.addProducto({
       quantity: 1,
       product: this.registro,
       subtotal: 1*Number(this.numberWithCommas(this.registro.price)),
     });
     //console.log(this.lstorageservicio.getCarrito());
     this.rutar.navigate(['carrito']);
 
   }

}
