import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuIsidComponent } from './menu-isid.component';

describe('MenuIsidComponent', () => {
  let component: MenuIsidComponent;
  let fixture: ComponentFixture<MenuIsidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuIsidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuIsidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
