import { Routes } from "@angular/router";
import { DoctorDetail } from "../doctor-listing/doctor-detail/doctor-detail";
import { DoctorList } from "../doctor-listing/doctor-list/doctor-list";
import { Dashboard } from "./dashboard/dashboard";

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      { path: 'stats', component: Dashboard },
      { path: 'doctors', component: DoctorList },
      { path: 'doctor-details/:id', component: DoctorDetail },
      { path: '', redirectTo: 'doctors', pathMatch: 'full' }
    ]
  }
];
