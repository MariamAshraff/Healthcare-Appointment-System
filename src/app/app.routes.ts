import { Component } from '@angular/core';
// app.routes.ts
import { Routes } from '@angular/router';
import { PatientProfile } from './features/patient/profile/patient-profile/patient-profile';
import { Appointment } from './features/admin/appointment/appointment';
import { DoctorList } from './features/doctor-listing/doctor-list/doctor-list';
import { DoctorDetail } from './features/doctor-listing/doctor-detail/doctor-detail';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { Home } from './features/home/home';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    canMatch: [roleGuard],
    data: { expectedRoles: ['admin'] },
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },

  {
    path: 'doctor',
    canActivate: [authGuard],
    canMatch: [roleGuard],
    data: { expectedRoles: ['doctor'] },
    loadChildren: () => import('./features/doctor/doctor.route').then(m => m.DOCTOR_ROUTES)
  },

  {
    path: 'patient',
    canActivate: [authGuard],
    canMatch: [roleGuard],
    data: { expectedRoles: ['patient'] },
    loadChildren: () => import('./features/patient/patient.route').then(m => m.PATIENT_ROUTES)
  },

  {
    path: 'login',
    canActivate: [authGuard],
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  },


  { path: '**', redirectTo: 'login' }
];
