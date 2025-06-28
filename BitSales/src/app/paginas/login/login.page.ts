import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SqliteService } from 'src/app/servicios/sqlite.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private sqliteService: SqliteService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

  async login() {
  if (!this.loginForm.valid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  const { usuario, contrasena } = this.loginForm.value;

  const valido = await this.sqliteService.validarUsuario(usuario, contrasena);
  if (valido) {
    localStorage.setItem('usuario', usuario);
    this.router.navigate(['/home']);
  } else {
    alert('Nombre de usuario o contraseña incorrectos');
  }
}


  irARegistro() {
    this.router.navigate(['/registro']);
  }
}
