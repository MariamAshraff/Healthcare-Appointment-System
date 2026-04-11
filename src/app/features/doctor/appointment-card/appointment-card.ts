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
  confirmDelete() {
    if (!this.appointment.id || !this.appointment.doctorId) return;

    this.appointmentService.delete(this.appointment.id).subscribe({
      next: () => {
        this.Toast.error('Delete Successfully')
        this.updateDoctorAvailability();
        this.OnDelete.emit();
      },
      error: () => this.Toast.error('Failed to delete appointment')
    });
  }

  private updateDoctorAvailability() {
    // if (!this.patient || !this.patient) {
    //   this.OnDelete.emit();
    //   return;
    // }

    // const updatedDoctor = { ...this.doctor };

    // const [appStart, appEnd] = this.appointment.timeSlot.split(' - ');

    // const appointmentDate = new Date(this.appointment.date);
    // const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // const appointmentDay = days[appointmentDate.getDay()];

    // const slotIndex = updatedDoctor.availableSlots.findIndex((s: any) =>
    //   s.day === appointmentDay &&
    //   s.startTime === appStart &&
    //   s.endTime === appEnd
    // );

    // if (slotIndex > -1) {
    //   updatedDoctor.availableSlots[slotIndex].isBooked = false;

    //   this.doctorService.updateDoctor(updatedDoctor.id, updatedDoctor).subscribe({
    //     next: () => {
    //       this.Toast.success('Appointment cancelled and slot is free now');
    //       this.OnDelete.emit();
    //     },
    //     error: (err) => {
    //       console.error('Error updating doctor slot:', err);
    //       this.OnDelete.emit();
    //     }
    //   });
    // } else {
    //   console.warn('Matching slot not found for day/time comparison');
    //   this.OnDelete.emit();
    // }
  }

}
