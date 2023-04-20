import { TestBed } from '@angular/core/testing';

import { CorreoServiceService } from './correo-service.service';

describe('CorreoServiceService', () => {
  let service: CorreoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorreoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
