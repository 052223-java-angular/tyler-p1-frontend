import { Component, OnInit, Self } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPayload } from 'src/app/models/login-payload';
import { AuthService } from 'src/app/services/auth-service.service';
import { MessageService } from 'primeng/api';
import { AppSettings } from 'src/app/global/app-settings';
import { TokenService } from 'src/app/services/token.service';
import { NgEventBus } from 'ng-event-bus';
import { EventBusEvents } from 'src/app/global/event-bus-events';

/**
 * Component for user registration.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  /**
   * Initializes the register form with empty fields and validators.
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private tokenService: TokenService,
    private router: Router,
    private eventBus: NgEventBus
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    if (this.tokenService.getUser().id) {
      this.router.navigate(['/']);
    }
  }

  /**
   * Submits the registration form and sends the payload to the backend API.
   * If the form is invalid, logs an error message to the console.
   */
  submitForm(): void {
    if (this.loginForm.invalid) {
      this.loginForm.controls['username'].markAsTouched();
      this.loginForm.controls['password'].markAsTouched();
      this.loginForm.reset();
      return;
    }

    // The payload to be sent to the backend API
    const payload: LoginPayload = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value,
    };

    // Call the authentication service to register the user
    this.authService.login(payload).subscribe({
      next: (data) => {
        this.tokenService.saveToken(data.accessToken);
        this.tokenService.saveRefreshToken(data.refreshToken);
        this.tokenService.saveUser(data);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login successful',
          life: AppSettings.DEFAULT_MESSAGE_LIFE,
        });
        this.eventBus.cast(EventBusEvents.LOGIN_LOGIN, '');
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message || error.statusText,
          life: AppSettings.DEFAULT_MESSAGE_LIFE,
        });
      },
    });
  }
}
