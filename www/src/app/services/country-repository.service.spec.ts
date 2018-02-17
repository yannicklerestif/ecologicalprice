import { TestBed, inject } from '@angular/core/testing';

import { CountryRepositoryService } from './country-repository.service';

describe('CountryRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountryRepositoryService],
    });
  });

  it(
    'should be created',
    inject([CountryRepositoryService], (service: CountryRepositoryService) => {
      expect(service).toBeTruthy();
    })
  );
});
