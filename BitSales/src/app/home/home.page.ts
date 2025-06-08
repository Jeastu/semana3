import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonPopover } from '@ionic/angular';







@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  @ViewChild('popover') popoverRef!: ElementRef<IonPopover>;

  usuario: string = '';
  menuVisible = false;
  menuEvent: any;

  juegos = [
    {
      nombre: 'Hellslave',
      imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1608450/header.jpg',
      oferta: 'Gratis hasta el 16 de junio',
      link: 'https://store.steampowered.com/app/1608450/Hellslave/',
      plataforma: 'Steam',
    },
    {
      nombre: 'Injustice 2',
      imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/627270/header.jpg',
      oferta: 'En oferta por $5.990 CLP',
      link: 'https://store.steampowered.com/app/627270/Injustice_2/',
      plataforma: 'Steam',
    },
    {
      nombre: 'Tell Me Why',
      imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1180660/header.jpg',
      oferta: 'Gratis durante junio',
      link: 'https://store.steampowered.com/app/1180660/Tell_Me_Why/',
      plataforma: 'Steam',
    },
    {
      nombre: 'Borderlands 2',
      imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/49520/header.jpg',
      oferta: 'Gratis del 5 al 8 de junio',
      link: 'https://store.steampowered.com/app/49520/Borderlands_2/',
      plataforma: 'Steam',
    },
    {
      nombre: 'Grand Theft Auto V',
      imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg',
      oferta: '50% de descuento: $14.990 CLP',
      link: 'https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/',
      plataforma: 'Steam',
    },
    {
      nombre: 'Red Dead Redemption 2',
      imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg',
      oferta: '75% de descuento: $14.990 CLP',
      link: 'https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/',
      plataforma: 'Steam',
    },
    {
      nombre: 'Cyberpunk 2077',
      imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
      oferta: '60% de descuento: $23.990 CLP',
      link: 'https://store.steampowered.com/app/1091500/Cyberpunk_2077/',
      plataforma: 'Steam',
    },
    {
      nombre: 'Hogwarts Legacy',
      imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg',
      oferta: '75% de descuento: $14.990 CLP',
      link: 'https://store.steampowered.com/app/990080/Hogwarts_Legacy/',
      plataforma: 'Steam',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    const nombre = localStorage.getItem('usuario');
    this.usuario = nombre ?? 'Invitado';
  }

  mostrarMenu(ev: any) {
    this.menuEvent = ev;
    this.menuVisible = true;
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  irAlPerfil() {
  this.menuVisible = false; // Cierra el popover visualmente
  setTimeout(() => {
    this.router.navigate(['/perfil']);
  }, 150); // Espera a que el popover se cierre antes de navegar
}


irANoticias() {
  this.router.navigate(['/noticias']);
}



  abrirEnlace(link: string) {
    window.open(link, '_blank');
  }
}
