import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  registerUser() {
    if (this.registerForm.invalid) {
      return;
    }

    const { username, email, password, confirmPassword } =
      this.registerForm.value;

    if (password !== confirmPassword) {
      alert('Şifreler eşleşmiyor!');
      return;
    }

    const user = { username, email, password };

    this.authService.register(user).subscribe(() => {
      alert('Kayıt başarılı!');
      this.router.navigate(['/login']); // Redirect to login after successful registration
    });
  }
}
