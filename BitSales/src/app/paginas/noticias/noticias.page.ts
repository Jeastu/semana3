import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { createAnimation } from '@ionic/angular';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
  standalone: false,
})
export class NoticiasPage implements OnInit, AfterViewInit {
  noticias = [
    {
      titulo: 'IGN anuncia nuevos lanzamientos para 2025',
      descripcion: 'La reconocida web IGN publicó su lista de lanzamientos más esperados para el próximo año.',
      imagen: 'https://assets-prd.ignimgs.com/2023/07/05/ign-logo-1688595100926.jpg',
      link: 'https://www.ign.com/articles/upcoming-games-2025'
    },
    {
      titulo: 'Steam lanza descuentos en RPGs clásicos',
      descripcion: 'Steam sorprende con una oleada de ofertas en juegos de rol legendarios.',
      imagen: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
      link: 'https://store.steampowered.com/news'
    },
    {
      titulo: 'Epic Games Store regala título sorpresa',
      descripcion: 'Durante esta semana, Epic Games ofrece un título gratuito que no te puedes perder.',
      imagen: 'https://cdn2.unrealengine.com/egs-freegames-2023-3840x2160-3840x2160-957f5124d745.jpg',
      link: 'https://store.epicgames.com/es-ES/free-games'
    }
  ];

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const items = document.querySelectorAll('.noticia-item');

    items.forEach((item, i) => {
      const anim = createAnimation()
        .addElement(item)
        .duration(500)
        .delay(i * 100) // efecto escalonado
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(20px)', 'translateY(0)');
      anim.play();
    });
  }

  abrirEnlace(link: string) {
    window.open(link, '_blank');
  }
}
