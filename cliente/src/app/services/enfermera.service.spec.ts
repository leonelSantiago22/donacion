import { TestBed } from '@angular/core/testing';

import { EnfermeraService } from './enfermera.service';

describe('EnfermeraService', () => {
  let service: EnfermeraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnfermeraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
