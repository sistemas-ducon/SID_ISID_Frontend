import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFrmPrincipalComponent } from './dashboard-frm-principal.component';

describe('DashboardFrmPrincipalComponent', () => {
  let component: DashboardFrmPrincipalComponent;
  let fixture: ComponentFixture<DashboardFrmPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardFrmPrincipalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardFrmPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
