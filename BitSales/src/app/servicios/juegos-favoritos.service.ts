// src/app/servicios/juegos-favoritos.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegosFavoritosService {
  private favoritos = [
    { id: 1, nombre: 'The Witcher 3', genero: 'Rol' },
    { id: 2, nombre: 'Elden Ring', genero: 'Acción' },
    { id: 3, nombre: 'Stardew Valley', genero: 'Simulación' }
  ];

  obtenerFavoritos(): Observable<any[]> {
    return of(this.favoritos);
  }

  agregarFavorito(juego: { nombre: string; genero: string }): void {
    const nuevoId = this.favoritos.length + 1;
    this.favoritos.push({ id: nuevoId, ...juego });
  }
}
