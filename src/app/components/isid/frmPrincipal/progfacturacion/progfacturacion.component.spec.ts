import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgfacturacionComponent } from './progfacturacion.component';

describe('ProgfacturacionComponent', () => {
  let component: ProgfacturacionComponent;
  let fixture: ComponentFixture<ProgfacturacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgfacturacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgfacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
