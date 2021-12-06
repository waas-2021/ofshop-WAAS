import { Injectable } from '@angular/core';

import { ProductosInterface } from 'src/app/interfaces/productos/productos-interface';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusquedaProductosServicioService {

  cachedValues: { [query: string]: ProductosInterface } = {};
  
  constructor(private http: HttpClient ) { this.http = http }

  busqueda = (query: string, page: number): Promise<ProductosInterface> => {
    let promise = new Promise<ProductosInterface>((resolve, reject) => {
      if( this.cachedValues[query] ) {
        resolve(this.cachedValues[query]) 
      }else{
        this.http.get('https://mx.openfoodfacts.org/cgi/search.pl?search_terms=' + query + '&page=' + page + '&page_size=24&search_simple=1&action=process&json=true')
        .toPromise()
        .then( (response) => {
          resolve(response as ProductosInterface)
        }, (error) => {
          reject(error);
        });
      }
    })
    return promise;
  }

}
