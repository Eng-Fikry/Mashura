import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "./Additions/footer/footer.component";
import { filter } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, FooterComponent,NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent   {
  // constructor(private _Router: Router,) {
  //   if (typeof window !== 'undefined') {
  //     const currentPath = window.location.pathname;
  //     const lastPath = sessionStorage.getItem('page');

  //     // ✅ لو الصفحة الرئيسية و في sessionStorage مسار محفوظ
  //     if (currentPath === '/' && lastPath && lastPath !== '/') {
  //       this._Router.navigateByUrl(lastPath);
  //     }
  //   }
  // }

  // ngOnInit(): void {
  //   if (typeof window !== 'undefined') {
  //     // ✅ كل ما المستخدم يغير الصفحة، احفظها
  //     this._Router.events
  // .pipe(filter(event => event instanceof NavigationEnd))
  // .subscribe((event) => {
  //   const nav = event as NavigationEnd;
  //   sessionStorage.setItem('page', nav.urlAfterRedirects);
  // });

  //     // ✅ مثال للتوجيه حسب الدور (ممكن تشيله لو مش محتاجه)
  //     if (sessionStorage.getItem('token') && sessionStorage.getItem('role')) {
  //       const role = sessionStorage.getItem('role');
  //       if (role === 'Doctor') {
  //         this._Router.navigate(['/Home']);
  //       } else if (role === 'Patient') {
  //         this._Router.navigate(['/HomeClient']);
  //       }
  //     }
  //   }
  // }
}
