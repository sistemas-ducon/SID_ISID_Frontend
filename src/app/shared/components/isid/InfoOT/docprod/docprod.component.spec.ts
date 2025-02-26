import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocprodComponent } from './docprod.component';

describe('DocprodComponent', () => {
  let component: DocprodComponent;
  let fixture: ComponentFixture<DocprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocprodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
