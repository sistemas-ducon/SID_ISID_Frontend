import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespieceComponent } from './despiece.component';

describe('DespieceComponent', () => {
  let component: DespieceComponent;
  let fixture: ComponentFixture<DespieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DespieceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DespieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
