import { RouterLink } from '@angular/router';
import { IDoctor } from '../../core/models/doctor';
import { DoctorService } from './../../core/service/doctor-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  /**
   *
   */
  doctors: IDoctor[]|null=null
  count:number=1;
  constructor(private DoctorService : DoctorService) {


  }
  ngOnInit(): void {
  this.DoctorService.getAllDoctors().subscribe({
    next: (data) => {
      this.doctors = data.slice(0, 7);
    },
    error: (err) => console.error('Error fetching appointments', err)
  });
}
}
