import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthnticationsService } from '../../Services/authntications/authntications.service';


@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  constructor(private toastr: ToastrService,private route: ActivatedRoute,private _Router: Router,private _AuthnticationsService:AuthnticationsService) {}
  email: string = '';
  token: string = '';


 

  passwordMatchValidator(form: any) {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { mismatch: true };
    }
    return null;
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('page', '/resetpassword');
    }
    
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];
      console.log(this.email);
      console.log(this.token);
      localStorage.setItem('email', this.email);
      localStorage.setItem('token', this.token);

      
    });
  }
  resetPaswword:FormGroup=new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', Validators.required),
    email: new FormControl(),
    token: new FormControl(),
  },this.passwordMatchValidator)

  submit() 
  {
    this.resetPaswword.get('email')?.setValue(localStorage.getItem('email'));
    this.resetPaswword.get('token')?.setValue(localStorage.getItem('token'));
    console.log(this.resetPaswword.value);

    this._AuthnticationsService.resetPassword(this.resetPaswword.value).subscribe({
      next: (response) => 
      {
        console.log(response);
        this.toastr.success('تم تحديث كلمة المرور بنجاح');
        this._Router.navigate(['Login']);
        localStorage.clear();
      },
      error: (error) => 
      {
        this.toastr.error(error.error.message);

      }
    })

  }

}
