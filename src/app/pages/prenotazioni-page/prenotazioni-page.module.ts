import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrenotazioniPageComponent } from './prenotazioni-page.component';
import {PrenotazioneCardComponent} from "../../components/prenotazione-card/prenotazione-card.component";
import {MatCardModule} from "@angular/material/card";
import {RouterModule, Routes} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import { PrenotazioneCancelDialogModalComponent } from '../../components/prenotazione-cancel-dialog-modal/prenotazione-cancel-dialog-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const routes: Routes = [  {    path: '',    component: PrenotazioniPageComponent  }];

@NgModule({
  declarations: [
    PrenotazioniPageComponent,
    PrenotazioneCardComponent,
    PrenotazioneCancelDialogModalComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatProgressSpinnerModule,
    ]
})
export class PrenotazioniPageModule { }
