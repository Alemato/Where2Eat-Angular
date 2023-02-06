import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";

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
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)
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
  { path: 'datiutente',
    loadChildren: () => import('./pages/dati-utente-page/dati-utente-page.module').then(m => m.DatiUtentePageModule),
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
