import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/service/auth-service';
import { IUser } from '../../../core/models/user';
import { IDoctor } from '../../../core/models/doctor';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  isClinicOpen = false;
  constructor(public authService: AuthService, private router: Router) { }
  toggleClinic() {
    this.isClinicOpen = !this.isClinicOpen;
  }


  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
