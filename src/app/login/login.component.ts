import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isPasswordVisible: boolean = false;

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  login() {
    if (this.loginForm.valid) {
      this.http
        .post('http://localhost:3200/api/v1/auth/login', this.loginForm.value)
        .subscribe(
          (response: any) => {
            console.log('Login successful', response);
            if (response.access) {
              localStorage.setItem('access', response.access);
              //alert('Usuario loggeado con éxito');
            }
            //this.router.navigate(['/home']);
          },
          (error) => {
            console.error('Login failed', error);
            //alert('Error');
          }
        );
    } else {
      console.log('Form is not valid');
    }
  }
}
