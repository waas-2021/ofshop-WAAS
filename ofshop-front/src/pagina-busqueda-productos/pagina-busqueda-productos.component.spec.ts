import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaBusquedaProductosComponent } from './pagina-busqueda-productos.component';

describe('PaginaBusquedaProductosComponent', () => {
  let component: PaginaBusquedaProductosComponent;
  let fixture: ComponentFixture<PaginaBusquedaProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaBusquedaProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaBusquedaProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
