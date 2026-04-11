import { Routes } from "@angular/router";
import { Dashboard } from "./dashboard/dashboard";
import { Prescriptions } from "./prescriptions/prescriptions";
import { Schedule } from "./schedule/schedule";
import { Appointments } from "./appointments/appointments";
import { Main } from "./main/main";
import { DoctorDetail } from "../doctor-listing/doctor-detail/doctor-detail";
import { PatientProfile } from "../patient/profile/patient-profile/patient-profile";
import { PrescriptionForm } from "./prescription-form/prescription-form";
import { AllNotifications } from "../all-notifications/all-notifications";

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
      { path: 'patient/:id', component: PatientProfile },
      { path: 'all-notifications', component: AllNotifications }
      { path: 'prescriptionForm/:id', component: PrescriptionForm },
    ]
  }
];
