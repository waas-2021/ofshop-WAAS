import { TestBed } from '@angular/core/testing';

import { ConexionBackService } from './conexion-back.service';

describe('ConexionBackService', () => {
  let service: ConexionBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexionBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
