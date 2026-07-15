# 🏥 Healthcare Appointment System

A role-based healthcare management platform built with **Angular 20**, allowing patients, doctors, and admins to manage appointments, medical records, and prescriptions through a single web application.

## Features

**Patient**
- Browse and search doctors, view profiles and availability
- Book, reschedule, and cancel appointments
- View medical records and prescriptions
- Manage personal profile

**Doctor**
- Dashboard with appointment schedule and stats
- Manage appointments (accept, complete, cancel)
- Create and manage prescriptions
- View patient history

**Admin**
- Manage doctors and patients
- Oversee all appointments across the platform
- Analytics dashboard (charts via Chart.js / ng2-charts)

**Shared**
- Role-based authentication and route guards (`admin`, `doctor`, `patient`)
- Real-time notifications (ngx-toastr)
- PDF export (jsPDF + html2canvas)
- Responsive UI (Bootstrap 5 + Bootstrap Icons)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 20 (standalone components) |
| Styling | Bootstrap 5, Bootstrap Icons |
| Charts | Chart.js, ng2-charts |
| Notifications | ngx-toastr |
| PDF Export | jsPDF, html2canvas |
| Mock API | `db.json` (JSON server style) |
| Hosting | Firebase Hosting |

## Getting Started

### Prerequisites
- Node.js and npm
- Angular CLI (`npm i -g @angular/cli`)

### Installation

```bash
npm install --legacy-peer-deps
```

### Run the app

```bash
ng serve
```

Then open `http://localhost:4200` in your browser.

### Mock backend

The app expects a REST API serving `db.json` (users, appointments, prescriptions, medical records, notifications). Update the API base URL in:

```
src/environments/environment.ts
src/environments/environment.development.ts
```

### Build

```bash
ng build
```

Build artifacts are output to `dist/Healthcare-Appointment-System`.

## Project Structure

```
src/app
├── core/           # guards, interceptors, models, services
├── features/
│   ├── admin/       # admin dashboard, doctor/patient/appointment management
│   ├── auth/        # login, register
│   ├── doctor/      # doctor dashboard, schedule, prescriptions
│   ├── doctor-listing/  # public doctor list & detail pages
│   ├── home/
│   └── patient/     # patient dashboard, appointments, records, prescriptions
└── shared/          # reusable components (dialogs, spinner, not-found)
```

## Deployment

The project is configured for **Firebase Hosting** (`firebase.json`), with CI workflows in `.github/workflows` for merge and pull-request preview deploys.

## License

This project is for educational/portfolio purposes.
