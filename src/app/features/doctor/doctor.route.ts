import { Routes } from "@angular/router";
import { Dashboard } from "./dashboard/dashboard";
import { Prescriptions } from "./prescriptions/prescriptions";
import { Schedule } from "./schedule/schedule";
import { Appointments } from "./appointments/appointments";
import { Main } from "./main/main";
import { DoctorDetail } from "../doctor-listing/doctor-detail/doctor-detail";

export const DOCTOR_ROUTES: Routes = [
  {
    path: '',
    component: Main,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'appointments', component: Appointments },
      { path: 'schedule/:id', component: Schedule },
      { path: 'prescriptions', component: Prescriptions },
      { path: 'details/:id', component: DoctorDetail },
    ]
  }
];
