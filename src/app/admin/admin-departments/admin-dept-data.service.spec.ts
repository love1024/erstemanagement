import { TestBed, inject } from '@angular/core/testing';

import { AdminDeptDataService } from './admin-dept-data.service';

describe('AdminDeptDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminDeptDataService]
    });
  });

  it('should be created', inject([AdminDeptDataService], (service: AdminDeptDataService) => {
    expect(service).toBeTruthy();
  }));
});
