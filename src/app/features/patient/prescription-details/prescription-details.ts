import { PrescriptionService } from './../../../core/service/prescription-service';
import { Prescription } from './../../../core/models/prescription';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDoctor } from '../../../core/models/doctor';
import { DoctorService } from '../../../core/service/doctor-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prescription-details',
  imports: [CommonModule],
  templateUrl: './prescription-details.html',
  styleUrl: './prescription-details.css',
})
export class PrescriptionDetails implements OnInit{
  Prescription!: Prescription
  doctor!: IDoctor

  constructor(private PrescriptionService: PrescriptionService,private activateRoute: ActivatedRoute,private doctorService: DoctorService) {
  }
  ngOnInit(): void {
    const id: string | null = this.activateRoute.snapshot.paramMap.get('id');
    if(id){
      this.PrescriptionService.getById(id).subscribe({
         next: (res) => {
          this.Prescription = res;
          this.doctorService.getDoctorById(this.Prescription.doctorId).subscribe({
            next: (data) => {
              this.doctor = data;
            },
        error: (err) => console.error('Error fetching doctor details', err)
      });
        },
        error: (err) => {
          console.error('Prescription not found', err);
        }
      });
    }
  }
}
