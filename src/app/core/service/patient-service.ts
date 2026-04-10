import { IUser } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class PatientService {

  private Patients = new BehaviorSubject<number>(0);
  Patients$ = this.Patients.asObservable();

  constructor(private http: HttpClient) { }

  private updateCount(count: number) {
    this.Patients.next(count);
  }
  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.baseUrl}/users?role=patient`);
  }

  getById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${environment.baseUrl}/users/${id}`);
  }
  Add(patient: IUser): Observable<IUser> {
    patient.role="patient";
    patient.isActive=true;
    return this.http.post<IUser>(`${environment.baseUrl}/users`, patient);
   }
  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/users/${id}`);
  }
  deactivate(id: string): Observable<IUser> {
  return this.http.patch<IUser>(`${environment.baseUrl}/users/${id}`,{ isActive: false });
  }

  activate(id: string): Observable<IUser> {
  return this.http.patch<IUser>(`${environment.baseUrl}/users/${id}`,{ isActive: true });
  }

  getDeactivePatients(): Observable<IUser[]> {
  return this.http.get<IUser[]>(`${environment.baseUrl}/users?isActive=false`);
  }
 update(patient: IUser): Observable<IUser> {
  return this.http.put<IUser>(
    `${environment.baseUrl}/users/${patient.id}`,
    patient
  );
}

}
