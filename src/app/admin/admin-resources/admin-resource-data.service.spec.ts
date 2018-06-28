import { TestBed, inject } from '@angular/core/testing';

import { AdminResourceDataService } from './admin-resource-data.service';

describe('AdminResourceDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminResourceDataService]
    });
  });

  it('should be created', inject([AdminResourceDataService], (service: AdminResourceDataService) => {
    expect(service).toBeTruthy();
  }));
});
