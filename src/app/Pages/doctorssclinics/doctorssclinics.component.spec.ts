import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorssclinicsComponent } from './doctorssclinics.component';

describe('DoctorssclinicsComponent', () => {
  let component: DoctorssclinicsComponent;
  let fixture: ComponentFixture<DoctorssclinicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorssclinicsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorssclinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
