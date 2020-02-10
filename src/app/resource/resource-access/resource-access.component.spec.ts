import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceAccessComponent } from './resource-access.component';

describe('ResourceAccessComponent', () => {
  let component: ResourceAccessComponent;
  let fixture: ComponentFixture<ResourceAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
