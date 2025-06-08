import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { createAnimation } from '@ionic/angular';

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

  // Cargar datos guardados (si existen)
  const datosGuardados = localStorage.getItem('perfil');
  if (datosGuardados) {
    this.perfilForm.setValue(JSON.parse(datosGuardados));
  }

  // ✨ Animación de entrada
  const animacionEntrada = createAnimation()
    .addElement(document.querySelector('ion-content')!)
    .duration(500)
    .easing('ease-in-out')
    .fromTo('opacity', '0', '1')
    .fromTo('transform', 'translateY(20px)', 'translateY(0px)');

  animacionEntrada.play();
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
