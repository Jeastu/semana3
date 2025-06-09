import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage implements OnInit {
  registroForm!: FormGroup;
  edadInvalida = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.registroForm = this.fb.group({
      usuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d).+$/)]],
      confirmar: ['', Validators.required],
      direccion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required]
    }, {
      validators: this.validarCoincidencia
    });
  }

  get f() {
    return this.registroForm.controls;
  }

  volver() {
    this.router.navigate(['/login']);
  }

  validarCoincidencia(group: FormGroup) {
    const pass = group.get('contrasena')?.value;
    const conf = group.get('confirmar')?.value;
    return pass === conf ? null : { noCoinciden: true };
  }

  calcularEdad(fecha: string): number {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
    return edad;
  }

  registrar() {
    const datos = this.registroForm.value;

    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    if (datos.contrasena !== datos.confirmar) {
      this.registroForm.setErrors({ noCoinciden: true });
      return;
    }

    const edad = this.calcularEdad(datos.fechaNacimiento);
    if (edad < 18) {
      this.edadInvalida = true;
      return;
    }

    console.log('Registro exitoso:', datos);
    alert('Cuenta creada con éxito');
    this.router.navigate(['/login']);
  }
}

