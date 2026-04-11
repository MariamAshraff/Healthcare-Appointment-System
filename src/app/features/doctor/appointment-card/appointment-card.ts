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

  CanAddPrescription: boolean = false

  @Input() appointment!: IAppointment;
  @Output() OnDelete = new EventEmitter()
  patient: IUser | null = null;
  appointmentIdToDelete: string | null = null;

  constructor(private patientService: PatientService,
    private appointmentService: AppointmentService,
    private Toast: ToastrService,
    private route: Router
  ) { }


  ngOnInit(): void {
    if (this.appointment && this.appointment.patientId) {
      this.patientService.getById(this.appointment.patientId).subscribe({
        next: (data) => {
          this.patient = data;

        },
        error: (err) => console.error('Error fetching doctor details', err)
      });
    }
    const selectedDate = new Date(this.appointment.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    if ((this.appointment.status === 'completed' || this.appointment.status === 'confirmed') && selectedDate <= today) {
      this.CanAddPrescription = true
    }
    else
      this.CanAddPrescription = false

    console.log(`this.CanAddPrescription${this.CanAddPrescription}, ${this.appointment.status}`)
  }

  onEdit(id?: string) {
    this.route.navigate(['/patient/appointmentForm', id]);
  }
  AddPrescription(id?: string) {
    this.route.navigate(['/doctor/prescriptionForm', id]);
  }
  confirmDelete() {
    if (!this.appointment.id || !this.appointment.doctorId) return;

    this.appointmentService.delete(this.appointment.id).subscribe({
      next: () => {
        this.Toast.error('Delete Successfully');
        this.OnDelete.emit();
      },
      error: () => this.Toast.error('Failed to delete appointment')
    });
  }

  updateStatus(newStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled') {
    if (!this.appointment.id) return;

    const updatedAppointment: IAppointment = { ...this.appointment, status: newStatus };

    this.appointmentService.update(updatedAppointment).subscribe({
      next: () => {
        this.appointment.status = newStatus;
        this.Toast.success(`Appointment marked as ${newStatus}`);
      },
      error: (err) => {
        console.error(err);
        this.Toast.error('Failed to update status');
      }
    });
  }
}
