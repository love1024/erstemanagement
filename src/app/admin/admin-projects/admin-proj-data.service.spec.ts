import { TestBed, inject } from '@angular/core/testing';

import { AdminProjDataService } from './admin-proj-data.service';

describe('AdminProjDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminProjDataService]
    });
  });

  it('should be created', inject([AdminProjDataService], (service: AdminProjDataService) => {
    expect(service).toBeTruthy();
  }));
});
