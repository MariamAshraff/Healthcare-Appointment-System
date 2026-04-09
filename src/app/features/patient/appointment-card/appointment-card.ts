import { Component, Input, OnInit } from '@angular/core';
import { IAppointment } from '../../../core/models/appointment';
import { IDoctor } from '../../../core/models/doctor';
import { IUser } from '../../../core/models/user';
import { AppointmentService } from '../../../core/service/appointment-service';
import { PatientService } from '../../../core/service/patient-service';
import { DoctorService } from '../../../core/service/doctor-service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-appointment-card',
  imports: [CommonModule, RouterLink, RouterModule,],
  templateUrl: './appointment-card.html',
  styleUrl: './appointment-card.css',
})
export class AppointmentCard implements OnInit {
  @Input() appointment!: IAppointment;
  doctor: IDoctor | null = null;

  constructor(private doctorService: DoctorService) { }
  ngOnInit(): void {

    if (this.appointment && this.appointment.doctorId) {
      this.doctorService.getDoctorById(this.appointment.doctorId).subscribe({
        next: (data) => {
          this.doctor = data;
        },
        error: (err) => console.error('Error fetching doctor details', err)
      });
    }
  }

}
