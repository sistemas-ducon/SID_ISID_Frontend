import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtsPendientesComponent } from './ots-pendientes.component';

describe('OtsPendientesComponent', () => {
  let component: OtsPendientesComponent;
  let fixture: ComponentFixture<OtsPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtsPendientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtsPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
