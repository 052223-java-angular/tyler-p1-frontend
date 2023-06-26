import { Component, OnInit, Self } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterPayload } from 'src/app/models/register-payload';
import { AuthService } from 'src/app/services/auth-service.service';
import { MessageService } from 'primeng/api';
import { AppSettings } from 'src/app/global/app-settings';
/**
 * Component for user registration.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  /**
   * Initializes the register form with empty fields and validators.
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  /**
   * Submits the registration form and sends the payload to the backend API.
   * If the form is invalid, logs an error message to the console.
   */
  submitForm(): void {
    if (this.registerForm.invalid) {
      this.registerForm.controls['username'].markAsTouched();
      this.registerForm.controls['password'].markAsTouched();
      this.registerForm.controls['confirmPassword'].markAsTouched();
      this.registerForm.reset();
      return;
    }

    // The payload to be sent to the backend API
    const payload: RegisterPayload = {
      username: this.registerForm.controls['username'].value,
      password: this.registerForm.controls['password'].value,
      confirmPassword: this.registerForm.controls['confirmPassword'].value,
    };

    // Call the authentication service to register the user
    this.authService.register(payload).subscribe({
      next: (value) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registration successful',
          life: AppSettings.DEFAULT_MESSAGE_LIFE,
        });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
          life: AppSettings.DEFAULT_MESSAGE_LIFE,
        });
      },
    });
  }
}
