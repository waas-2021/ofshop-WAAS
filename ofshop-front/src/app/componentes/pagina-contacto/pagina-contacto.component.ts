import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-contacto',
  templateUrl: './pagina-contacto.component.html',
  styleUrls: ['./pagina-contacto.component.css']
})
export class PaginaContactoComponent implements OnInit {

  contactoForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.contactoForm = this.formBuilder.group({
      nombres:[''],
      apellidos:[''],
      correo:[''],
      mensaje:['']
    })
  }

  enviarMensaje(){
    console.log(this.contactoForm.value);
      if (this.contactoForm.valid){
        alert("Mensaje enviado");
        console.log(this.contactoForm.valid);
        //localStorage.setItem('contacto', JSON.stringify(this.contactoForm.value));
        this.contactoForm.reset();
        this.router.navigate(['']);
      }
      else{
        alert("Usuario incorrecto");
      }
    
  }
}
