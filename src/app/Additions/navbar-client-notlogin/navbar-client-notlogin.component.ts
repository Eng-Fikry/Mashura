import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-client-notlogin',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar-client-notlogin.component.html',
  styleUrl: './navbar-client-notlogin.component.css'
})
export class NavbarClientNotloginComponent {

}
