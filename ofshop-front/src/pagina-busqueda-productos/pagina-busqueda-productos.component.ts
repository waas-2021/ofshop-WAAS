import { Component, OnInit } from '@angular/core';

import { BusquedaProductosServicioService } from 'src/app/servicios/productos/busqueda-productos-servicio.service';

import { ProductosInterface } from 'src/app/interfaces/productos/productos-interface';

import { BusquedaProductosModel } from 'src/app/clases/productos/busqueda-productos-model';

@Component({
  selector: 'app-pagina-busqueda-productos',
  templateUrl: './pagina-busqueda-productos.component.html',
  styleUrls: ['./pagina-busqueda-productos.component.css']
})
export class PaginaBusquedaProductosComponent implements OnInit {

  resultadoBsk!: ProductosInterface;
  cargandoBand: boolean = false;
  bskModel = new BusquedaProductosModel('',1);
  search!: string;

  constructor( private bsqServicio: BusquedaProductosServicioService ){}

  ngOnInit(): void {
    this.sendQuery(true);
  }

  sendQuery = (reset: boolean) => {
    if(reset) {
      this.bskModel.page = 1;
      this.search = this.bskModel.q;
    }
    this.cargandoBand = true;
    this.bsqServicio.busqueda(this.search, this.bskModel.page).then( (response) => {
      this.cargandoBand = false;
      this.resultadoBsk =  response;
    }, (error) => {
      alert("error: " + error.statusText );
    })

  }

  paginar = (page: number) => {
    console.log(page);
    this.bskModel.page = page;
    this.sendQuery(false);
  }

}
