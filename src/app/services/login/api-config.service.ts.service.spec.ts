import { TestBed } from '@angular/core/testing';

import { ApiConfigServiceTsService } from './api-config.service.ts.service';

describe('ApiConfigServiceTsService', () => {
  let service: ApiConfigServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConfigServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
