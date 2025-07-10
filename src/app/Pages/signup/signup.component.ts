import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthnticationsService } from '../../Services/authntications/authntications.service';
import { Router } from '@angular/router';
import { NavbarComponent } from "../../Additions/navbar/navbar.component";
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, NavbarComponent,CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  errorMessage: string | null = null;

  constructor(private toastr: ToastrService,private authService: AuthnticationsService,private _Router:Router) {
    
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('page', '/Signup');
    }
  }
  signupForm:FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      acceptTerms: new FormControl(false, Validators.requiredTrue),

    },this.passwordMatchValidator
       // Custom validator applied here at FormGroup level
  );
 
  

  // Custom validator to check if the passwords match
   passwordMatchValidator(form: any) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { mismatch: true };
    }
    return null;
  }

  onSubmit() {
    console.log(this.signupForm.value);
    if (this.signupForm.valid) {
      const formData = this.signupForm.value; 
      this.authService.signup(formData).subscribe({
        next: (response) => {
          if(response.role=="Doctor")
            {
              
              this._Router.navigate(['/doctorprofile']);
              console.log(response.role);

            }
            else if(response.role=="Patient")
              {
                this._Router.navigate(['/patientprofile']);
  
              }
              localStorage.setItem('token', response.token);
              localStorage.setItem('role', response.role);
              localStorage.setItem('id', response.id);
              this.toastr.success('تم التسجيل بنجاح');
          // this._Router.navigate(['/Login']);
        },
        error: (error) => {
          console.error('Signup Failed', error);
          this.errorMessage = 'حدث خطأ أثناء التسجيل، يرجى المحاولة مرة أخرى';
          this.toastr.error(error.message);
        }
      });
    } else {
      this.errorMessage = 'يرجى ملء جميع الحقول بشكل صحيح';
    }
}







}
