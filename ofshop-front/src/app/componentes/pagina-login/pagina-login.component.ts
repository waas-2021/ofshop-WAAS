import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ConexionBackService } from 'src/app/servicios/apiservicio/conexion-back.service';

@Component({
  selector: 'app-pagina-login',
  templateUrl: './pagina-login.component.html',
  styleUrls: ['./pagina-login.component.css']
})
export class PaginaLoginComponent implements OnInit {

  loginForm!: FormGroup
  
  constructor(private formBuilder: FormBuilder, private router: Router, private conexiondb: ConexionBackService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      correo:[''],
      contrasena:['']
    })
  }

  login(){
      const user = this.loginForm.value.correo === 'admin@gmail.com' && this.loginForm.value.contrasena === '12345';
      let conexion = this.conexiondb.getInicioSesion(this.loginForm.value);
      console.log(conexion);
      if (user){
        alert("Se ha logueado exitosamente");
        localStorage.setItem('token', JSON.stringify(this.loginForm.value.correo));
        this.loginForm.reset();
        this.router.navigate(['']);
      }
      else{
        alert("Usuario incorrecto");
      }
    }

}
