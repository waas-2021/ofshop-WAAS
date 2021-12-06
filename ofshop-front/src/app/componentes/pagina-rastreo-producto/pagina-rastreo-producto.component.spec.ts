import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaRastreoProductoComponent } from './pagina-rastreo-producto.component';

describe('PaginaRastreoProductoComponent', () => {
  let component: PaginaRastreoProductoComponent;
  let fixture: ComponentFixture<PaginaRastreoProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaRastreoProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaRastreoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
