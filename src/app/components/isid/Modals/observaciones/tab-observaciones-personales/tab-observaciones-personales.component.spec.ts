import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabObservacionesPersonalesComponent } from './tab-observaciones-personales.component';

describe('TabObservacionesPersonalesComponent', () => {
  let component: TabObservacionesPersonalesComponent;
  let fixture: ComponentFixture<TabObservacionesPersonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabObservacionesPersonalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabObservacionesPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
