import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IDoctor } from '../../../core/models/doctor';
import { DoctorService } from '../../../core/service/doctor-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctor-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './doctor-detail.html',
  styleUrl: './doctor-detail.css',
})
export class DoctorDetail implements OnInit {
  doctor?: IDoctor;
  id: string = '';

  constructor(private doctorService: DoctorService,
    private activateRoute: ActivatedRoute,
    private toast: ToastrService
  ) { }
  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.paramMap.get('id') || '';
    this.doctorService.getDoctorById(this.id).subscribe({
      next: (data) => {
        this.doctor = data;
      },
      error: (err) => {
        this.toast.error('Failed to load product details. Please try again later.', 'Access Denied')
        // alert('Failed to load product details. Please try again later.');
        // console.error('Error fetching product details:', err);
      }
    });
  }
}
