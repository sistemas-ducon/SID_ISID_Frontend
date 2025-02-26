import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProgramacionOTComponent } from './modal-programacion-ot.component';

describe('ModalProgramacionOTComponent', () => {
  let component: ModalProgramacionOTComponent;
  let fixture: ComponentFixture<ModalProgramacionOTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalProgramacionOTComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProgramacionOTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
