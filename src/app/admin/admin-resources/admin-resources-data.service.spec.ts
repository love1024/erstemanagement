import { TestBed, inject } from '@angular/core/testing';

import { AdminResourcesDataService } from './admin-resources-data.service';

describe('AdminResourcesDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminResourcesDataService]
    });
  });

  it('should be created', inject([AdminResourcesDataService], (service: AdminResourcesDataService) => {
    expect(service).toBeTruthy();
  }));
});
