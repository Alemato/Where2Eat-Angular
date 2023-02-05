import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RistorantePageComponent } from './ristorante-page.component';
import {RouterModule, Routes} from "@angular/router";
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import { RistorantePrenotazioneVerificaComponent } from '../../components/ristorante-prenotazione-verifica/ristorante-prenotazione-verifica.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {ReactiveFormsModule} from "@angular/forms";
import { RistorantePrenotazionePrenotaComponent } from '../../components/ristorante-prenotazione-prenota/ristorante-prenotazione-prenota.component';

const routes: Routes = [
  {
    path: '',
    component: RistorantePageComponent
  }
];

@NgModule({
  declarations: [
    RistorantePageComponent,
    RistorantePrenotazioneVerificaComponent,
    RistorantePrenotazionePrenotaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'it-IT'},
  ]
})
export class RistorantePageModule { }
