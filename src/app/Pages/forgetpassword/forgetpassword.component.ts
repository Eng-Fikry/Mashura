import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthnticationsService } from '../../Services/authntications/authntications.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {
  constructor(private toastr: ToastrService,private _Router:Router,private _AuthnticationsService:AuthnticationsService,private _NgxSpinnerService:NgxSpinnerService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('page', '/forgetpassword');
    }
  }

  sendEmail:FormGroup=new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })




  submit() 
  {
    this._NgxSpinnerService.show();
    const email=this.sendEmail.value.email;
    console.log(email);
    console.log(this.sendEmail.value);
    // this._AuthnticationsService.checkEmailExisit(email).subscribe({
    //   next: (response) => {
    //     if(response==false)
    //       {
    //         this.toastr.error('البريد الالكتروني غير موجود');
    //       }
    //       else
    //       {
            this._AuthnticationsService.forgetPassword(this.sendEmail.value).subscribe({
              next: (response) => {
                this._NgxSpinnerService.hide();
                console.log(response);
                this.toastr.success(response.message);
                this._Router.navigate(['/Login']);
              },
              error: (error) => {
                this._NgxSpinnerService.hide();
                console.log(error);
                this.toastr.error(error.message);
              }
            })
          }
        
      }
  //     error: (error) => {
  //       console.log(error);
  //       this.toastr.error(error.message);
  //     }
  //   })
  // }
  //   }
  // }

