import { Routes } from '@angular/router';
import { DoctorList } from './features/doctor-listing/doctor-list/doctor-list';

export const routes: Routes = [
  {
    path: '',
    component: DoctorList
  },
  {
    path: 'doctors',
    loadChildren: () => import('./features/doctor-listing/doctor-listing.routes')
      .then(m => m.DOCTOR_LIST_ROUTES)
  },
];
