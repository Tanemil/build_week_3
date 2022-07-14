import { TestBed } from '@angular/core/testing';

import { ActualClientIdService } from './actual-client-id.service';

describe('ActualClientIdService', () => {
  let service: ActualClientIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualClientIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
