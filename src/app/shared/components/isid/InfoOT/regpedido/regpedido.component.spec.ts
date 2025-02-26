import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegpedidoComponent } from './regpedido.component';

describe('RegpedidoComponent', () => {
  let component: RegpedidoComponent;
  let fixture: ComponentFixture<RegpedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegpedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegpedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
