import { TestBed } from '@angular/core/testing';

import { AuthnticationsService } from './authntications.service';

describe('AuthnticationsService', () => {
  let service: AuthnticationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthnticationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
