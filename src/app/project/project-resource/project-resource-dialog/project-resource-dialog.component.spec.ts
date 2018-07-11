import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectResourceDialogComponent } from './project-resource-dialog.component';

describe('ProjectResourceDialogComponent', () => {
  let component: ProjectResourceDialogComponent;
  let fixture: ComponentFixture<ProjectResourceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectResourceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectResourceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
