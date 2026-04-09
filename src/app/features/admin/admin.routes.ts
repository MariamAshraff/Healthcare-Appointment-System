import { Routes } from "@angular/router";
import { DoctorDetail } from "../doctor-listing/doctor-detail/doctor-detail";
import { DoctorList } from "../doctor-listing/doctor-list/doctor-list";
import { Dashboard } from "./dashboard/dashboard";
import { Appointment } from "./appointment/appointment";
import { Main } from "./main/main";

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: Main,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'doctors', component: DoctorList },
      { path: 'doctor-details/:id', component: DoctorDetail },
      { path: 'appointments', component: Appointment }
    ]
  }
];
