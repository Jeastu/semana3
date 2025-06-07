import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  perfilForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

ngOnInit() {
  this.perfilForm = this.fb.group({
    nombreCompleto: [''],
    telefono: [''],
    plataforma: [''],
    categorias: [''],
    descripcion: [''],
    avatar: ['']
  });

  const datosGuardados = localStorage.getItem('perfil');
  if (datosGuardados) {
    this.perfilForm.setValue(JSON.parse(datosGuardados));
  }
}

guardarPerfil() {
  const datos = this.perfilForm.value;
  localStorage.setItem('perfil', JSON.stringify(datos));
  alert('Perfil guardado con éxito');
}


  // ✅ Aquí agregamos el método que faltaba
  volverInicio() {
    this.router.navigate(['/home']);
  }
}
