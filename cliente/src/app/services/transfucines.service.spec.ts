import { TestBed } from '@angular/core/testing';

import { TransfucinesService } from './transfucines.service';

describe('TransfucinesService', () => {
  let service: TransfucinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransfucinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
