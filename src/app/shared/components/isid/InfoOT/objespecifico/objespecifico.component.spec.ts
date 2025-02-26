import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjespecificoComponent } from './objespecifico.component';

describe('ObjespecificoComponent', () => {
  let component: ObjespecificoComponent;
  let fixture: ComponentFixture<ObjespecificoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjespecificoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjespecificoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
