import { TestBed, inject } from '@angular/core/testing';

import { AttdTrackerDataService } from './attd-tracker-data.service';

describe('AttdTrackerDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttdTrackerDataService]
    });
  });

  it('should be created', inject([AttdTrackerDataService], (service: AttdTrackerDataService) => {
    expect(service).toBeTruthy();
  }));
});
