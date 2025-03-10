import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabObservacionesPendientesComponent } from './tab-observaciones-pendientes.component';

describe('TabObservacionesPendientesComponent', () => {
  let component: TabObservacionesPendientesComponent;
  let fixture: ComponentFixture<TabObservacionesPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabObservacionesPendientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabObservacionesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
