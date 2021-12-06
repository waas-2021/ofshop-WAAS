import { TestBed } from '@angular/core/testing';

import { BusquedaProductoServicioService } from './busqueda-producto-servicio.service';

describe('BusquedaProductoServicioService', () => {
  let service: BusquedaProductoServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusquedaProductoServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
