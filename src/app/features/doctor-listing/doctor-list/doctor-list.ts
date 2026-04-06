import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../core/service/doctor-service';
import { IDoctor } from '../../../core/models/doctor';

@Component({
  selector: 'app-doctor-list',
  imports: [CommonModule],
  templateUrl: './doctor-list.html',
  styleUrl: './doctor-list.css',
})
export class DoctorList implements OnInit {

  doctors: IDoctor[] = [];
  doctorsCount = 0;

  constructor(private _DoctorService: DoctorService) { }
  ngOnInit(): void {
    this._DoctorService.getAllDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
      },
      error: (err) => {
        console.error("Failed to load doctors. Please try again later.");
      }
    });

    this._DoctorService.Doctors$.subscribe({
      next: (count) => {
        this.doctorsCount = count;
      }
    });
  }

}
