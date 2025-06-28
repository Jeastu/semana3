import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { createAnimation } from '@ionic/angular';
import { JuegosService } from '../../servicios/juegos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
  standalone: false,
})
export class NoticiasPage implements OnInit, AfterViewInit {
  noticias: any[] = [];

  constructor(
    private juegosService: JuegosService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.juegosService.obtenerJuegos().subscribe(
      (datos: any[]) => {
        this.noticias = datos.slice(0, 10).map(post => ({
          titulo: post.title,
          descripcion: post.body,
          imagen: 'https://via.placeholder.com/150',
          link: `https://jsonplaceholder.typicode.com/posts/${post.id}`
        }));
      },
      (error: any) => {
        console.error('Error al cargar noticias falsas:', error);
        this.router.navigate(['/error404']); // 👈 Redirige a la página de error
      }
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const items = document.querySelectorAll('.noticia-item');
      items.forEach((item, i) => {
        const anim = createAnimation()
          .addElement(item)
          .duration(500)
          .delay(i * 100)
          .fromTo('opacity', '0', '1')
          .fromTo('transform', 'translateY(20px)', 'translateY(0)');
        anim.play();
      });
    }, 500);
  }

  abrirEnlace(link: string) {
    window.open(link, '_blank');
  }
}
