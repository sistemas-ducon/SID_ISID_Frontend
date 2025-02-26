import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumosplanoComponent } from './insumosplano.component';

describe('InsumosplanoComponent', () => {
  let component: InsumosplanoComponent;
  let fixture: ComponentFixture<InsumosplanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsumosplanoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsumosplanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
