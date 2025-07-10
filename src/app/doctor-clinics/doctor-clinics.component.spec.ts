import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorClinicsComponent } from './doctor-clinics.component';

describe('DoctorClinicsComponent', () => {
  let component: DoctorClinicsComponent;
  let fixture: ComponentFixture<DoctorClinicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorClinicsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorClinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
