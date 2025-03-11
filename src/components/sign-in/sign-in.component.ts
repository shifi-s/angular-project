import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../app/services/auth.service';
import { MatSelectModule } from '@angular/material/select'; // הוספת מודול ה- Select
import { MatOptionModule } from '@angular/material/core'; // הוספת מודול ה- Option
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,MatCardModule,MatSelectModule,MatOptionModule, MatInputModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  // משתנים עם Signal
  isSignIn = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  
  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  // טופס ההרשמה
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('', [Validators.required])
  });

  // שינוי מצב של כניסת משתמש
  change() {
    this.isSignIn.set(true);
  }

  // שליחת הטופס
  submitForm() {
    if (this.myForm.invalid) {
      this.errorMessage.set("נא למלא את כל השדות כראוי.");
      return;
    }

    const userData = this.myForm.getRawValue();

    // קריאה לשירות ההרשמה
    this.authService.register(userData).subscribe({
      next: (response) => {
        if (userData.role === 'teacher') {
          this.router.navigate(['/teachCourses']);
        } else {
          this.router.navigate(['/myCourses']);
        }
        sessionStorage.setItem('myToken', response.token);
        sessionStorage.setItem('role', userData.role!);
        sessionStorage.setItem('userId', response.userId);
      },
      error: () => {
        this.errorMessage.set("שגיאה בהרשמה, נסה שנית.");
      }
    });
  }

  // ניקוי הודעות שגיאה
  clearError() {
    this.errorMessage.set(null);
  }
}
