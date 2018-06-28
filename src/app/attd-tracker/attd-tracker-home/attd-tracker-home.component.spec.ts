import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttdTrackerHomeComponent } from './attd-tracker-home.component';

describe('AttdTrackerHomeComponent', () => {
  let component: AttdTrackerHomeComponent;
  let fixture: ComponentFixture<AttdTrackerHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttdTrackerHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttdTrackerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
