import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { createAnimation } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  perfilForm!: FormGroup;
  fotoPerfil: string | null = null;
  listaJuegos = ['Minecraft', 'Elden Ring', 'Valorant', 'God of War', 'Zelda', 'FIFA 24'];
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.perfilForm = this.fb.group({
      nombreCompleto: [''],
      telefono: [''],
      plataforma: [''],
      categorias: [''],
      descripcion: [''],
      avatar: [''], // lo seguiremos usando internamente
      juegosSeguidos: [[]]
    });

    const datosGuardados = localStorage.getItem('perfil');
    if (datosGuardados) {
      const perfil = JSON.parse(datosGuardados);
      this.perfilForm.setValue(perfil);
      this.fotoPerfil = perfil.avatar || null;
    }

    const animacionEntrada = createAnimation()
      .addElement(document.querySelector('ion-content')!)
      .duration(500)
      .easing('ease-in-out')
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(20px)', 'translateY(0px)');

    animacionEntrada.play();
  }

  async tomarFoto() {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    this.fotoPerfil = image.dataUrl ?? null;
    this.perfilForm.patchValue({ avatar: this.fotoPerfil });
  } catch (error) {
    console.error('Error al tomar la foto:', error);
  }
}

eliminarFoto() {
  this.fotoPerfil = null;
  this.perfilForm.patchValue({ avatar: '' });
}


  guardarPerfil() {
    const datos = this.perfilForm.value;
    localStorage.setItem('perfil', JSON.stringify(datos));
    alert('Perfil guardado con éxito');
  }

  volverInicio() {
    this.router.navigate(['/home']);
  }
}
