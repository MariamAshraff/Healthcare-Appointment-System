import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const menu = document.getElementById('doctorSidebar');
      if (menu && menu.classList.contains('show')) {
        menu.classList.remove('show');
      }
    });
  }
}
