import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Prenotazione} from "../../model/prenotazione";
import {
  PrenotazioneCancelDialogModalComponent
} from "../prenotazione-cancel-dialog-modal/prenotazione-cancel-dialog-modal.component";
import {MatDialog} from "@angular/material/dialog";

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

  constructor(public dialog: MatDialog) {
    this.deletePrenotazioneEvent = new EventEmitter();
  }

  openDialogCancell(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(PrenotazioneCancelDialogModalComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {idPrenotazione: this.prenotazione?.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePrenotazioneEvent.emit(this.prenotazione);
      }
    });
  }

}
