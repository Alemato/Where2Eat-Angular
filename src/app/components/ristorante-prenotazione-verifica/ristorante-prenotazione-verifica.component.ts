import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Prenotazione} from "../../model/prenotazione";
import {
  RistorantePrenotazionePrenotaComponent
} from "../ristorante-prenotazione-prenota/ristorante-prenotazione-prenota.component";
import {CustomValidators} from "../../validators/custom-validators";
import {ErrorStateMatcher} from "@angular/material/core";

@Component({
  selector: 'app-ristorante-prenotazione-verifica',
  templateUrl: './ristorante-prenotazione-verifica.component.html',
  styleUrls: ['./ristorante-prenotazione-verifica.component.css']
})
export class RistorantePrenotazioneVerificaComponent {

  verificaForm: FormGroup;
  prenotazione?: Prenotazione;

  errorePrenotazione?: boolean = false;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<RistorantePrenotazioneVerificaComponent>,
              public dialog: MatDialog
  ) {
    this.verificaForm = this.fb.group({
      dataPrenotazione: ['', [Validators.required, CustomValidators.dataPrenotazioneValid]],
      oraPrenotazione: ['', [Validators.required, Validators.pattern('\\d\\d:\\d\\d')]],
      postiPrenotazione: ['', [Validators.required, Validators.pattern('[0-9]+')]]
    });
  }

  cercaPrenotazione(): void {
    this.errorePrenotazione = false;
    let dt = new Date();
    dt.setHours(this.verificaForm.value.oraPrenotazione.split(":")[0]);
    dt.setMinutes(this.verificaForm.value.oraPrenotazione.split(":")[1]);
    this.prenotazione = this.verificaForm.value;
    console.log("cerca");
    //TODO query verifica
    let verifica = true;
    if (verifica) {
      this.dialogRef.close();
      this.openDialogPrenotazione(dt);
    } else {
      this.errorePrenotazione = true;
    }
  }

  openDialogPrenotazione(ora: Date): void {
    this.dialog.open(RistorantePrenotazionePrenotaComponent, {
      data: {
        data: this.verificaForm.value.dataPrenotazione,
        ora: ora,
        numeroPosti: this.verificaForm.value.postiPrenotazione
      }
    });
  }

}
