import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IAppointment } from '../models/appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {


  private appointmentsCount = new BehaviorSubject<number>(0);
  appointmentsCount$ = this.appointmentsCount.asObservable();

  constructor(private http: HttpClient) { }

  private updateCount(count: number) {
    this.appointmentsCount.next(count);
  }

  getAll(): Observable<IAppointment[]> {
    return this.http.get<IAppointment[]>(`${environment.baseUrl}/appointments`);
  }

  getAllByPatientId(patientId: string): Observable<IAppointment[]> {
    return this.http.get<IAppointment[]>(`${environment.baseUrl}/appointments`).pipe(
      map(appointments =>
        appointments.filter(app => String(app.patientId) === String(patientId))
      )
    );
  }

  getAllByDoctorId(doctorId: string): Observable<IAppointment[]> {
    return this.http.get<IAppointment[]>(`${environment.baseUrl}/appointments`).pipe(
      map(appointments =>
        appointments.filter(app => String(app.doctorId) === String(doctorId))
      )
    );
  }

  getById(id: string): Observable<IAppointment> {
    return this.http.get<IAppointment>(`${environment.baseUrl}/appointments/${id}`);
  }

  add(appointment: IAppointment): Observable<IAppointment> {
    return this.http.post<IAppointment>(`${environment.baseUrl}/appointments`, appointment);
  }

  update(appointment: IAppointment): Observable<IAppointment> {
    return this.http.put<IAppointment>(`${environment.baseUrl}/appointments/${appointment.id}`, appointment);
  }

  delete(id?: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/appointments/${id}`);
  }

}
