import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaContactoComponent } from './pagina-contacto.component';

describe('PaginaContactoComponent', () => {
  let component: PaginaContactoComponent;
  let fixture: ComponentFixture<PaginaContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
