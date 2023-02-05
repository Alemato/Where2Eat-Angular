import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PrenotazioneService} from 'src/app/services/prenotazione.service';

@Component({
  selector: 'app-prenotazione-cancel-dialog-modal',
  templateUrl: './prenotazione-cancel-dialog-modal.component.html',
  styleUrls: ['./prenotazione-cancel-dialog-modal.component.css']
})
export class PrenotazioneCancelDialogModalComponent {
  constructor(public dialogRef: MatDialogRef<PrenotazioneCancelDialogModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {idPrenotazione: number},
              private prenotazioneService: PrenotazioneService) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
