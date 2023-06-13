import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterPayload } from 'src/app/models/register-payload';
import { AuthServiceService } from 'src/app/services/auth-service.service';

/**
 * Component for user registration.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  /**
   * Initializes the register form with empty fields and validators.
   */
  constructor(private fb: FormBuilder, private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  /**
   * Submits the registration form and sends the payload to the backend API.
   * If the form is invalid, logs an error message to the console.
   */
  submitForm(): void {
    if (this.registerForm.invalid) {
      console.log('This form is invalid');
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
      next: value => {
        // Handle the success response
        // TODO: Add code for handling success response
      },
      error: error => {
        // Handle the error response
        // TODO: Add code for handling error response
      }
    });
  }
}
