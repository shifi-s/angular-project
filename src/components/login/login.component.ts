import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../app/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: any;
  isLogin = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  constructor(private authService: AuthService, private router: Router) {}

  myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  submitForm() {
    if (this.myForm.invalid) {
      this.errorMessage.set("נא למלא את כל השדות כראוי.");
      return;
    }

    const userData = this.myForm.getRawValue();
    this.authService.login(userData).subscribe({
      next: (response) => {
        sessionStorage.setItem('myToken', response.token);
        sessionStorage.setItem('role', response.role);
        sessionStorage.setItem('userId', response.userId);
        
        if (response.role === 'teacher') {
          this.router.navigate(['/teachCourses']);
        } else {
          this.router.navigate(['/myCourses']);
        }
      },
      error: () => {
        this.errorMessage.set("שם המשתמש או הסיסמה שגויים. נסה שוב.");
      }
    });
  }

  change() {
    this.isLogin.set(true);
  }

  clearError() {
    this.errorMessage.set(null);
  }
}
