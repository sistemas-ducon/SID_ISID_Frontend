import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenTrabajoSidComponent } from './orden-trabajo-sid.component';

describe('OrdenTrabajoSidComponent', () => {
  let component: OrdenTrabajoSidComponent;
  let fixture: ComponentFixture<OrdenTrabajoSidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenTrabajoSidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenTrabajoSidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
