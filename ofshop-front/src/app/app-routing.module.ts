import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';
import { PaginaNoEncontradaComponent } from './componentes/pagina-no-encontrada/pagina-no-encontrada.component'
import { PaginaBusquedaProductosComponent } from './componentes/pagina-busqueda-productos/pagina-busqueda-productos.component';
import { PaginaCompraProductosComponent } from './componentes/pagina-compra-productos/pagina-compra-productos.component';
import { PaginaProductoComponent } from './componentes/pagina-producto/pagina-producto.component';
import { PaginaLoginComponent } from './componentes/pagina-login/pagina-login.component';
import { PaginaContactoComponent } from './componentes/pagina-contacto/pagina-contacto.component';
import { PaginaRegistroComponent } from './componentes/pagina-registro/pagina-registro.component';

const routes: Routes = [
  //{ path: '', component: PaginaPrincipalComponent },
  { path: '', redirectTo: 'busqueda', pathMatch: 'full' },
  { path: 'login', component: PaginaLoginComponent },
  { path: 'registro', component: PaginaRegistroComponent },
  { path: 'inicio', component: PaginaPrincipalComponent },
  { path: 'busqueda', component: PaginaBusquedaProductosComponent },
  { path: 'producto/:id', component: PaginaProductoComponent },
  { path: 'contacto', component: PaginaContactoComponent },
  { path: 'carrito', component: PaginaCompraProductosComponent },
  { path: '**', component: PaginaNoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
