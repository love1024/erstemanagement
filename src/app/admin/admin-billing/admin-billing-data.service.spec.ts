import { TestBed, inject } from '@angular/core/testing';

import { AdminBillingDataService } from './admin-billing-data.service';

describe('AdminBillingDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminBillingDataService]
    });
  });

  it('should be created', inject([AdminBillingDataService], (service: AdminBillingDataService) => {
    expect(service).toBeTruthy();
  }));
});
