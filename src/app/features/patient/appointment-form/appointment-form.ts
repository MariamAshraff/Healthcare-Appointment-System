import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DoctorService } from '../../../core/service/doctor-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IDoctor } from '../../../core/models/doctor';
import { AuthService } from '../../../core/service/auth-service';
import { IUser } from '../../../core/models/user';
import { IAppointment } from '../../../core/models/appointment';
import { AppointmentService } from '../../../core/service/appointment-service';

@Component({
  selector: 'app-appointment-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment-form.html',
  styleUrl: './appointment-form.css',
})
export class AppointmentForm {
  // doctor?: IDoctor;
  // id: string = '';
  // patient?: IUser;
  // appointmentForm: FormGroup;


  constructor(private doctorService: DoctorService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toast: ToastrService,
    private fb: FormBuilder,
    public router: Router,
    private appointmentService: AppointmentService
  ) { }

  appointmentForm!: FormGroup;
  isEditMode = false;
  selectedDoctor: IDoctor | null = null;
  currentUserId?: string = '';
  today: string = new Date().toISOString().split('T')[0];

  ngOnInit(): void {
    this.authService.user$.subscribe({
      next: (user) => {
        this.currentUserId = user?.id
      }
    });

    this.initForm();

    const idFromUrl = this.route.snapshot.paramMap.get('id');

    if (idFromUrl) {
      this.checkIfEditOrAdd(idFromUrl);
    }
  }

  initForm() {
    this.appointmentForm = this.fb.group({
      date: ['', [Validators.required]],
      timeSlot: ['', [Validators.required]],
    });
  }

  checkIfEditOrAdd(id: string) {
    this.appointmentService.getById(id).subscribe({
      next: (appointment) => {
        this.isEditMode = true;
        this.appointmentForm.patchValue(appointment);
        this.loadDoctorInfo(appointment.doctorId);
      },
      error: () => {
        this.isEditMode = false;
        this.loadDoctorInfo(id);
      }
    });
  }

  loadDoctorInfo(doctorId: string) {
    this.doctorService.getDoctorById(doctorId).subscribe({
      next: (doc) => {
        this.selectedDoctor = doc;
        this.appointmentForm.patchValue({ doctorId: doc.id });
      }
    });
  }

  onSubmit() {
    if (this.appointmentForm.invalid || !this.selectedDoctor || !this.currentUserId) {
      this.toast.warning('Please complete the form and ensure you are logged in.');
      return;
    }

    const formData = this.appointmentForm.value;
    const selectedSlotValue = formData.timeSlot;

    if (!this.isEditMode) {
      const appointmentData: IAppointment = {
        ...formData,
        patientId: this.currentUserId,
        doctorId: this.selectedDoctor.id,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      this.appointmentService.add(appointmentData).subscribe({
        next: () => {
          const updatedSlots = this.selectedDoctor!.availableSlots.map(slot => {
            const slotRange = `${slot.startTime} - ${slot.endTime}`;
            if (slotRange === selectedSlotValue) return { ...slot, isBooked: true };
            return slot;
          });
          this.updateDoctorSlots(updatedSlots, 'Appointment booked successfully!');
        }
      });
    }
    else {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.appointmentService.getById(id).subscribe((oldApp) => {
        const appointmentData: IAppointment = {
          ...oldApp,
          ...formData
        };

        this.appointmentService.update(appointmentData).subscribe({
          next: () => {
            const updatedSlots = this.selectedDoctor!.availableSlots.map(slot => {
              const slotRange = `${slot.startTime} - ${slot.endTime}`;
              if (slotRange === selectedSlotValue) return { ...slot, isBooked: true };
              if (slotRange === oldApp.timeSlot && selectedSlotValue !== oldApp.timeSlot) return { ...slot, isBooked: false };
              return slot;
            });
            this.updateDoctorSlots(updatedSlots, 'Appointment updated successfully!');
          }
        });
      });
    }
    //
  }

  private updateDoctorSlots(updatedSlots: any[], successMessage: string) {
    this.doctorService.updateDoctor(this.selectedDoctor!.id, { availableSlots: updatedSlots }).subscribe({
      next: () => {
        this.toast.success(successMessage);
        this.appointmentForm.reset();
        this.router.navigateByUrl(`/patient/appointments`);
      },
      error: () => {
        this.toast.warning('Process completed, but doctor schedule update failed.');
        this.router.navigateByUrl(`/patient/appointments`);
      }
    });
  }

}
