import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabObservacionesOtComponent } from './tab-observaciones-ot.component';

describe('TabObservacionesOtComponent', () => {
  let component: TabObservacionesOtComponent;
  let fixture: ComponentFixture<TabObservacionesOtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabObservacionesOtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabObservacionesOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
