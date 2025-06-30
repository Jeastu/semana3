import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { createAnimation } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { SqliteService } from 'src/app/servicios/sqlite.service'; 

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
  usuario: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sqliteService: SqliteService
  ) {}

  ngOnInit() {
  this.perfilForm = this.fb.group({
    nombreCompleto: [''],
    telefono: [''],
    plataforma: [''],
    categorias: [''],
    descripcion: [''],
    avatar: [''],
    juegosSeguidos: [[]]
  });

  this.usuario = localStorage.getItem('usuario') || '';
  if (this.usuario) {
  this.sqliteService.obtenerPerfilPorUsuario(this.usuario).then(perfil => {
      if (perfil) {
        this.perfilForm.setValue({
          ...perfil,
          avatar: perfil.avatar || '',
          juegosSeguidos: perfil.juegosSeguidos || []
        });
        this.fotoPerfil = perfil.avatar || null;
      }
    });
  }

  // Animación opcional 
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

  async guardarPerfil() {
    const datos = {
      usuario: this.usuario,
      ...this.perfilForm.value
    };

    try {
      await this.sqliteService.insertarPerfil(datos);
      alert('Perfil guardado con éxito');
    } catch (err) {
      alert('Hubo un error al guardar el perfil');
    }
  }

  volverInicio() {
    this.router.navigate(['/home']);
  }
}
