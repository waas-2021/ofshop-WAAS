import { Component, OnInit } from '@angular/core';
import {RastreoProductoService} from '../../servicios/rastreo/rastreo-producto.service';

@Component({
  selector: 'app-pagina-rastreo-producto',
  templateUrl: './pagina-rastreo-producto.component.html',
  styleUrls: ['./pagina-rastreo-producto.component.css']
})
export class PaginaRastreoProductoComponent implements OnInit {

  constructor(private serviceRastreo : RastreoProductoService) {}
  ngOnInit(): void {
   
  };

  
}
