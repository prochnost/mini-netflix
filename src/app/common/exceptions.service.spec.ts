import { TestBed } from '@angular/core/testing';

import { ExceptionsService } from './exceptions.service';

describe('ExceptionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExceptionsService = TestBed.get(ExceptionsService);
    expect(service).toBeTruthy();
  });
});
