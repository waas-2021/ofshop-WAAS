import { Injectable } from '@angular/core';

import { ProductoInterface } from 'src/app/interfaces/productos/producto-interface';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusquedaProductoServicioService {

  cachedValues: { [query: string]: ProductoInterface } = {};
  
  constructor(private http: HttpClient ) { this.http = http }

  busqueda = (query: string): Promise<ProductoInterface> => {
    let promise = new Promise<ProductoInterface>((resolve, reject) => {
      if( this.cachedValues[query] ) {
        resolve(this.cachedValues[query]) 
      }else{
        this.http.get('https://mx.openfoodfacts.org/api/v2/product/' + query)
        .toPromise()
        .then( (response) => {
          resolve(response as ProductoInterface)
        }, (error) => {
          reject(error);
        });
      }
    })
    return promise;
  }

}
