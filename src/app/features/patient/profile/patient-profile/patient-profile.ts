import { ActivatedRoute } from '@angular/router';
import { IUser } from './../../../../core/models/user';
import { PatientService } from './../../../../core/service/patient-service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-profile',
  imports: [CommonModule],
  templateUrl: './patient-profile.html',
  styleUrl: './patient-profile.css',
})
export class PatientProfile implements OnInit {
  /**
   *
   */
  patient: IUser | null = null;;
  constructor( private patientService: PatientService,private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || 'null';
    if (id !=null)
    {
       this.patientService.getById(id).subscribe({
        next: (data) => this.patient = data,
        error: (err) => console.error('Error fetching patient', err)
    });
    }

  }
}
