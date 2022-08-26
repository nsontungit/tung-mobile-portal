import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileManagementOverviewComponent } from './mobile-management-overview.component';

describe('MobileManagementOverviewComponent', () => {
  let component: MobileManagementOverviewComponent;
  let fixture: ComponentFixture<MobileManagementOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileManagementOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileManagementOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
