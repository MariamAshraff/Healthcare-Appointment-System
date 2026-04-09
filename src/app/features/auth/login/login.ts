import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/service/auth-service';
import { Router } from '@angular/router';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (isSuccess) => {
          if (isSuccess) {
            const role = this.authService.getRole();
            this.toastr.success('Welcome back! You have logged in successfully.', 'Success');
            if (role === 'admin') this.router.navigateByUrl('/admin');
            else if (role === 'doctor') this.router.navigateByUrl('/doctor');
            else if (role === 'patient') this.router.navigateByUrl('/patient');
            else {
              this.toastr.error('Login Failed');
            }
          }
          else {
            this.toastr.error('Invalid email or password. Please try again.', 'Login Failed');
          }
        },
        error: (err) => {
          console.error('Error:', err);
        }
      })
    }
  }
}
