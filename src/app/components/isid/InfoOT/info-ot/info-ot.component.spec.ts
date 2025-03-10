import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoOTComponent } from './info-ot.component';

describe('InfoOTComponent', () => {
  let component: InfoOTComponent;
  let fixture: ComponentFixture<InfoOTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoOTComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoOTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
