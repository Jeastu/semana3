import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
},
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./paginas/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./paginas/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'noticias',
    loadChildren: () => import('./paginas/noticias/noticias.module').then( m => m.NoticiasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'error404',
    loadChildren: () => import('./paginas/error404/error404.module').then( m => m.Error404PageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./paginas/error404/error404.module').then(m => m.Error404PageModule),
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
