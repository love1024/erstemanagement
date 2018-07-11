import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelInfoDialogComponent } from './level-info-dialog.component';

describe('LevelInfoDialogComponent', () => {
  let component: LevelInfoDialogComponent;
  let fixture: ComponentFixture<LevelInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
