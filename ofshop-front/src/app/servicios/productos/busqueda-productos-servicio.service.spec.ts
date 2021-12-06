import { TestBed } from '@angular/core/testing';

import { BusquedaProductosServicioService } from './busqueda-productos-servicio.service';

describe('BusquedaProductosServicioService', () => {
  let service: BusquedaProductosServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusquedaProductosServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
