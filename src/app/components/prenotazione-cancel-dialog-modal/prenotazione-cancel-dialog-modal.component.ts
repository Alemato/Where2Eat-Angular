import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-prenotazione-cancel-dialog-modal',
  templateUrl: './prenotazione-cancel-dialog-modal.component.html',
  styleUrls: ['./prenotazione-cancel-dialog-modal.component.css']
})
export class PrenotazioneCancelDialogModalComponent {
  constructor(private dialogRef: MatDialogRef<PrenotazioneCancelDialogModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { idPrenotazione: number }) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
