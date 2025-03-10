import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTodasObservacionesComponent } from './tab-todas-observaciones.component';

describe('TabTodasObservacionesComponent', () => {
  let component: TabTodasObservacionesComponent;
  let fixture: ComponentFixture<TabTodasObservacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabTodasObservacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabTodasObservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
