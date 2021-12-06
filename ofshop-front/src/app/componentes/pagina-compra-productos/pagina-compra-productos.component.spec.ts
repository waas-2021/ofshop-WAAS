import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCompraProductosComponent } from './pagina-compra-productos.component';

describe('PaginaCompraProductoComponent', () => {
  let component: PaginaCompraProductosComponent;
  let fixture: ComponentFixture<PaginaCompraProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaCompraProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaCompraProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
