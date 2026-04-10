import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAppointment } from '../../../core/models/appointment';
import { IDoctor } from '../../../core/models/doctor';
import { IUser } from '../../../core/models/user';
import { AppointmentService } from '../../../core/service/appointment-service';
import { PatientService } from '../../../core/service/patient-service';
import { DoctorService } from '../../../core/service/doctor-service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointment-card',
  imports: [CommonModule, RouterLink, RouterModule,],
  templateUrl: './appointment-card.html',
  styleUrl: './appointment-card.css',
})
export class AppointmentCard implements OnInit {
  @Input() appointment!: IAppointment;
  @Output() OnDelete = new EventEmitter()
  doctor: IDoctor | null = null;

  constructor(private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private Toast: ToastrService,
    private route: Router
  ) { }
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

  onEdit(id?: string) {
    this.route.navigate(['/patient/appointmentForm', id]);
  }
  onDelete(id: string | undefined) {
    this.appointmentService.delete(id!).subscribe({
      next: () => {
        this.Toast.success('Appointment deleted successfully');
        this.OnDelete.emit();
      },
      error: () => {
        this.Toast.error('Failed to delete appointment');
      }
    })
  }

}
