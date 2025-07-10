import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicsPatientComponent } from './clinics-patient.component';

describe('ClinicsPatientComponent', () => {
  let component: ClinicsPatientComponent;
  let fixture: ComponentFixture<ClinicsPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicsPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
