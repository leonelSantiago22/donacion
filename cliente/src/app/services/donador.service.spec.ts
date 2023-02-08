import { TestBed } from '@angular/core/testing';

import { DonadorService } from './donador.service';

describe('DonadorService', () => {
  let service: DonadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
