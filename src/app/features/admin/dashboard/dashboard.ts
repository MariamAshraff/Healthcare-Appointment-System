import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  isDoctorsOpen = false;

  toggleDoctors() {
    this.isDoctorsOpen = !this.isDoctorsOpen;
  }
}
