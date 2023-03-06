import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {LoginGuard} from "./guards/login.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ristoranti/:id',
    loadChildren: () => import('./pages/ristorante-page/ristorante-page.module').then(m => m.RistorantePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'registrazione',
    loadChildren: () => import('./pages/registrazione-page/registrazione-page.module').then(m => m.RegistrazionePageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'prenotazioni',
    loadChildren: () => import('./pages/prenotazioni-page/prenotazioni-page.module').then(m => m.PrenotazioniPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/ricerca-ristoranti-page/ricerca-ristoranti-page.module').then(m => m.RicercaRistorantiPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'datiutente',
    loadChildren: () => import('./pages/dati-utente-page/dati-utente-page.module').then(m => m.DatiUtentePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    loadChildren: () => import('./pages/not-found-page/not-found-page.module').then(m => m.NotFoundPageModule),
  },
  {path: '**', redirectTo: '/404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
