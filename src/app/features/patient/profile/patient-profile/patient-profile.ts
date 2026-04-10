import { ActivatedRoute } from '@angular/router';
import { IUser } from './../../../../core/models/user';
import { PatientService } from './../../../../core/service/patient-service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/service/auth-service';

@Component({
  selector: 'app-patient-profile',
  imports: [CommonModule],
  templateUrl: './patient-profile.html',
  styleUrl: './patient-profile.css',
})
export class PatientProfile implements OnInit {

  patient: IUser | null = null;;
  constructor( private patientService: PatientService,private route: ActivatedRoute,
    private authService: AuthService,
  ) {

  }
   ngOnInit(): void {
    this.authService.user$.subscribe({
      next: (user) => {
        if (user) {
          this.patient = user as IUser;
          this.patientService.getById(this.patient.id).subscribe({
            next: (data) => {
              this.patient = data;
            }
          });
        }
      }
    })
  }
}
