import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { INotification } from '../../core/models/inotification';
import { NotificationService } from '../../core/service/notification-service';
import { AuthService } from '../../core/service/auth-service';

@Component({
  selector: 'app-all-notifications',
  imports: [CommonModule],
  templateUrl: './all-notifications.html',
  styleUrl: './all-notifications.css',
})
export class AllNotifications implements OnInit {
  notifications: INotification[] = [];

  constructor(
    private notifService: NotificationService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.notifService.loadNotifications(user.id);
      }
    });

    this.notifService.notifications$.subscribe(list => {
      this.notifications = list;
    });
  }
  clearAll() {
    this.authService.user$.subscribe(user => {
      if (user && user.id) {
        if (confirm('Are you sure you want to clear your notifications?')) {
          this.notifService.clearAll(user.id);
        }
      }
    });
  }
}
