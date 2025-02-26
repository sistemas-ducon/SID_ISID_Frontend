import { TestBed } from '@angular/core/testing';

import { InfoOtStateService } from './info-ot-state.service';

describe('InfoOtStateService', () => {
  let service: InfoOtStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoOtStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
