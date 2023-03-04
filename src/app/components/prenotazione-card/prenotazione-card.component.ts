import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Prenotazione} from "../../model/prenotazione";
import {
  PrenotazioneCancelDialogModalComponent
} from "../prenotazione-cancel-dialog-modal/prenotazione-cancel-dialog-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {URL_BASE_IMG} from "../../constants";

@Component({
  selector: 'app-prenotazione-card',
  templateUrl: './prenotazione-card.component.html',
  styleUrls: ['./prenotazione-card.component.css']
})
export class PrenotazioneCardComponent {

  @Input()
  prenotazione?: Prenotazione;

  @Output()
  deletePrenotazioneEvent: EventEmitter<Prenotazione>;

  urlImmagine: string = URL_BASE_IMG;

  constructor(public dialog: MatDialog) {
    this.deletePrenotazioneEvent = new EventEmitter();
  }

  openDialogCancell(): void {
    const dialogRef = this.dialog.open(PrenotazioneCancelDialogModalComponent, {
      width: '80%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {idPrenotazione: this.prenotazione?.id}
    });
    // Non è necessario fare unsubscribe su afterClosed (scritto sulle docs)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePrenotazioneEvent.emit(this.prenotazione);
      }
    });
  }

}
