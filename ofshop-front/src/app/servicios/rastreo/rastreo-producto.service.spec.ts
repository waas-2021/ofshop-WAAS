import { TestBed } from '@angular/core/testing';

import { RastreoProductoService } from './rastreo-producto.service';

describe('RastreoProductoService', () => {
  let service: RastreoProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RastreoProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
