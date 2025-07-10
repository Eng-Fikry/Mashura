import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthnticationsService } from '../../Services/authntications/authntications.service';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from "../../Additions/navbar/navbar.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private toastr: ToastrService,private authService: AuthnticationsService,private _Router:Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('page', '/Login');
    }
    
  }

  Login:FormGroup=new FormGroup(
    {
      EmailOrPhone: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })

    Log()
    {
      console.log(this.Login.value);
      this.authService.login(this.Login.value).subscribe({

        next: (response) => {
          console.log(response.role);
          console.log('Login Successful', response);
          localStorage.setItem('token', response.token);
          if(response.role==="Doctor"){
            this._Router.navigate(['/Home']);
          }
          else if(response.role==="Patient"){
            this._Router.navigate(['/HomeClient']);
          }
          localStorage.setItem('role', response.role);
          localStorage.setItem('id', response.id);
          this.toastr.success('تم تسجيل الدخول بنجاح');
        },
        error: (error) => {
          console.error('Login Failed', error);
          this.toastr.error("كلمة المرور او البريد الالكتروني غير صحيح");
        }
      })
      

    }
  }
