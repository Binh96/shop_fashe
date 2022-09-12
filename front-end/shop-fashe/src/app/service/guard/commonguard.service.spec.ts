import { TestBed } from '@angular/core/testing';

import { CommonguardService } from './commonguard.service';

describe('CommonguardService', () => {
  let service: CommonguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
