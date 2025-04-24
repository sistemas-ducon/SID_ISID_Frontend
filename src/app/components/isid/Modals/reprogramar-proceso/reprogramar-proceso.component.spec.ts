import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprogramarProcesoComponent } from './reprogramar-proceso.component';

describe('ReprogramarProcesoComponent', () => {
  let component: ReprogramarProcesoComponent;
  let fixture: ComponentFixture<ReprogramarProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReprogramarProcesoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReprogramarProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
