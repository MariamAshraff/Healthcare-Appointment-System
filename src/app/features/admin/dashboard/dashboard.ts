import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from "@angular/router";
import { IAppointment } from '../../../core/models/appointment';
import { IUser } from '../../../core/models/user';
import { AppointmentService } from '../../../core/service/appointment-service';
import { AuthService } from '../../../core/service/auth-service';
import { AppointmentCard } from "../appointment-card/appointment-card";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, AppointmentCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  allappointments: IAppointment[] = [];

  pastAppointments: IAppointment[] = [];
  upcomingAppointments: IAppointment[] = [];
  todayAppointments: IAppointment[] = [];
  user?: IUser;
  totalAppointmentsCount=0

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.authService.user$.subscribe({
      next: (user) => {
        if (user) {
          this.user = user as IUser;
          this.appointmentService.getAll().subscribe({
            next: (data) => {
              this.allappointments = data;
              this.totalAppointmentsCount = data.length;

              this.pastAppointments =
                this.appointmentService.getPastAppointments(data);

              this.upcomingAppointments =
                this.appointmentService.getUpcomingAppointments(data);

              this.todayAppointments =
                this.appointmentService.getTodayAppointments(data);
            }
          });
        }
      }
    });
  }
}
