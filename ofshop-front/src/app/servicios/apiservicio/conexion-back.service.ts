import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ConexionBackService {

  constructor(private http:HttpClient) { }

  apiUrl = 'http://localhost:300';

  getInicioSesion(data:any):Observable<any>{
    return this.http.get(this.apiUrl+'/login',data);
  }
}
