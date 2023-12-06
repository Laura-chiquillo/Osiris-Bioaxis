import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  panelOpenState = false;

  constructor (private router: Router) {}

  investigadorHome() {
    this.router.navigate(['/investigadores']);
  }
}
