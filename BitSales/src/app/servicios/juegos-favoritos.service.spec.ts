import { TestBed } from '@angular/core/testing';

import { JuegosFavoritosService } from './juegos-favoritos.service';

describe('JuegosFavoritosService', () => {
  let service: JuegosFavoritosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuegosFavoritosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
