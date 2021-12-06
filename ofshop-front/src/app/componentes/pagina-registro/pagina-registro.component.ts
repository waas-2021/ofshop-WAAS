import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-registro',
  templateUrl: './pagina-registro.component.html',
  styleUrls: ['./pagina-registro.component.css']
})
export class PaginaRegistroComponent implements OnInit {

  registroForm!: FormGroup
  
  users!: String[] 

  siCoincide!:boolean;
  usuarioDisponible!:boolean;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

 /* ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      nombreUsuario: new FormControl(['', Validators.required]) ,
      apellidoUsuario:new FormControl(['', Validators.required]) ,
      aliasUsuario:new FormControl(['', Validators.required]) ,
      correo:new FormControl(['', Validators.required, Validators.email]) ,
      contra:new FormControl(['', Validators.required]) ,
      contraValidacion:new FormControl(['', Validators.required]) ,
      //terminosCheck:['']
    }, { Validators: this.compararContra()})
  }*/

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      nombreUsuario: [''], 
      apellidoUsuario:[''] ,
      aliasUsuario:[''] ,
      correo:[''] ,
      contra:[''] ,
      contraValidacion:['']
      //terminosCheck:['']
    })
    this.siCoincide=true;
    this.usuarioDisponible=true;
    this.users= [
      'jojo',
      'jaja',
      'jeje'
    ]
  }

  compararContra(){
    let booleano=false;
    if(this.registroForm.value.contra === this.registroForm.value.contraValidacion){
      booleano=true;
    }
    
    return booleano;
  }

  validarUsuario(){
    let disponible=true;
    for(var i=0; i < this.users.length; i++){
      if(this.users[i]==this.registroForm.value.aliasUsuario){
        disponible = false;
      }
    }
    return disponible;
  }

  

  registro(){
    /*console.log(this.registroForm.value.contra);
    console.log(this.registroForm.value.contraValidacion);
    console.log(this.compararContra());
    console.log(this.registroForm);*/
   //const user = this.registroForm.value.correo === 'admin@gmail.com' && this.registroForm.value.contra === '12345';
    this.usuarioDisponible= this.validarUsuario();
    this.siCoincide = this.compararContra(); 
    if(this.usuarioDisponible && this.siCoincide){
      alert("Se ha registrado exitosamente");
      //localStorage.setItem('token', JSON.stringify(this.registroForm.value.correo));
      this.siCoincide=true;
      this.usuarioDisponible = true;
      this.registroForm.reset();
      this.router.navigate(['/login']); 
    }
    else{
      if(!this.usuarioDisponible){
        alert("Usuario ocupado.");
      }
      else{
        alert("La contraseña no coincide.");
      }
      this.registroForm.reset();
    }
    
    
  }

  

}
