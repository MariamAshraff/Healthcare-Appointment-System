import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DoctorService } from '../../../core/service/doctor-service';
import { IDoctor } from '../../../core/models/doctor';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctor-list.html',
  styleUrl: './doctor-list.css',
})
export class DoctorList implements OnInit {

  doctors: IDoctor[] = [];
  doctorsCount = 0;

  private fb = inject(FormBuilder);
  filterForm: FormGroup = this.fb.group({
    fullName: [''],
    spec: [''],
    maxPrice: [null as number | null],
    day: ['']
  });

  constructor(private _DoctorService: DoctorService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllDoctors();
    this._DoctorService.Doctors$.subscribe(count => this.doctorsCount = count);
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  loadAllDoctors() {
    this._DoctorService.getAllDoctors().subscribe(data => this.doctors = data);
  }

  applyFilters() {
    const { fullName, spec, maxPrice, day } = this.filterForm.value;

    this._DoctorService.getDoctorsByFilters('', {
      fullName: fullName || undefined,
      spec: spec || undefined,
      maxPrice: maxPrice || undefined,
      day: day || undefined
    }).subscribe(data => this.doctors = data);
  }

  resetFilters() {
    this.filterForm.reset();
    this.loadAllDoctors();
  }

  GoToDoctorDetails(id: string) {
    this.router.navigate(['/patient/doctor', id]);
  }

}
