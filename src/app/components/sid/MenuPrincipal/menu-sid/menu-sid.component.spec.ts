import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSidComponent } from './menu-sid.component';

describe('MenuSidComponent', () => {
  let component: MenuSidComponent;
  let fixture: ComponentFixture<MenuSidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuSidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
