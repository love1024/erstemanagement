import { AttdTrackerModule } from './attd-tracker.module';

describe('AttdTrackerModule', () => {
  let attdTrackerModule: AttdTrackerModule;

  beforeEach(() => {
    attdTrackerModule = new AttdTrackerModule();
  });

  it('should create an instance', () => {
    expect(attdTrackerModule).toBeTruthy();
  });
});
