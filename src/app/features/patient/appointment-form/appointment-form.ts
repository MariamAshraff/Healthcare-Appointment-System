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
  doctor?: IDoctor;
  id: string = '';
  patient?: IUser;
  appointmentForm: FormGroup;


  constructor(private doctorService: DoctorService,
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private toast: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private appointmentService: AppointmentService
  ) {
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      timeSlot: ['', Validators.required],
      notes: ['']
    });
  }
  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.paramMap.get('id') || '';
    this.doctorService.getDoctorById(this.id).subscribe({
      next: (data) => {
        this.doctor = data;
      },
      error: (err) => {
        this.toast.error('Failed to load Doctor details. Please try again later.', 'Access Denied');
      }
    });

    this.authService.user$.subscribe({
      next: (user) => {
        this.patient = user as IUser;
      },
      error: err => {
        this.toast.error('Failed to load Patient details. Please try again later.', 'Access Denied');
      }
    })
  }

  onSubmit() {
    if (this.appointmentForm.valid && this.doctor && this.patient) {
      const appointmentData: IAppointment = {
        patientId: this.patient.id,
        doctorId: this.doctor.id,
        status: 'pending',
        createdAt: new Date().toISOString(),
        ...this.appointmentForm.value
      };

      this.appointmentService.add(appointmentData);
      this.toast.success('Your appointment has been booked!', 'Success');
      this.appointmentForm.reset();
      this.router.navigateByUrl(`/patient/appointments`);

    } else {
      this.toast.warning('Please complete the form and ensure you are logged in.');
    }
  }
}
