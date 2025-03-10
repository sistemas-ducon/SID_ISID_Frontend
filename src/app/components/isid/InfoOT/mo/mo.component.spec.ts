import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoComponent } from './mo.component';

describe('MoComponent', () => {
  let component: MoComponent;
  let fixture: ComponentFixture<MoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
