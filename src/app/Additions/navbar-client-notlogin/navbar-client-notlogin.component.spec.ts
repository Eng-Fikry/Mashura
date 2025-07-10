import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarClientNotloginComponent } from './navbar-client-notlogin.component';

describe('NavbarClientNotloginComponent', () => {
  let component: NavbarClientNotloginComponent;
  let fixture: ComponentFixture<NavbarClientNotloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarClientNotloginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarClientNotloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
