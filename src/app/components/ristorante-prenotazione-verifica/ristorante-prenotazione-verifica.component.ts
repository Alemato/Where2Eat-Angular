import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Prenotazione} from "../../model/prenotazione";
import {
  RistorantePrenotazionePrenotaComponent
} from "../ristorante-prenotazione-prenota/ristorante-prenotazione-prenota.component";
import {CustomValidators} from "../../validators/custom-validators";
import {PrenotazioneService} from "../../services/prenotazione.service";
import {HttpErrorResponse} from "@angular/common/http";
import {RistoranteService} from "../../services/ristorante.service";
import {TranslateService} from "@ngx-translate/core";
import {DateAdapter} from "@angular/material/core";
import {LinguaService} from "../../services/lingua.service";

@Component({
  selector: 'app-ristorante-prenotazione-verifica',
  templateUrl: './ristorante-prenotazione-verifica.component.html',
  styleUrls: ['./ristorante-prenotazione-verifica.component.css']
})
export class RistorantePrenotazioneVerificaComponent {

  verificaForm: FormGroup;
  prenotazione?: Prenotazione;

  orari: string[] = [];


  errorePrenotazione?: boolean = false;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: { idRistorante: number },
              private dialogRef: MatDialogRef<RistorantePrenotazioneVerificaComponent>,
              private dialog: MatDialog,
              private prenotazioneService: PrenotazioneService,
              private ristoranteService: RistoranteService,
              private translateService: TranslateService,
              private linguaService: LinguaService,
              private dateAdapter: DateAdapter<any>
  ) {
    this.dateAdapter.setLocale(this.linguaService.getLinguaAttuale());
    this.verificaForm = this.fb.group({
      dataPrenotazione: ['', [Validators.required, CustomValidators.dataPrenotazioneValid]],
      oraPrenotazione: [{value: '', disabled: true}, [Validators.required, Validators.pattern('\\d\\d:\\d\\d')]],
      postiPrenotazione: [{value: '', disabled: true}, [Validators.required, Validators.pattern('[0-9]+')]]
    });
  }

  onOnInit(): void {
    this.initTranslate();
  }

  validationMessages = {
    dataPrenotazione: [
      {type: 'required', message: 'Date is required'},
      {type: 'pattern', message: 'Date is passed'},
    ],
    oraPrenotazione: [
      {type: 'required', message: 'Time is required'},
      {type: 'pattern', message: 'Time is invalid'},
    ],
    postiPrenotazione: [
      {type: 'required', message: 'Seat number is required'},
      {type: 'dateError', message: 'Seat number is invalid'},
    ]
  };

  initTranslate() {
    this.translateService.get('DATA_RICHIESTA_MESSAGE').subscribe((data) => {
      this.validationMessages.dataPrenotazione[0].message = data;
    });
    this.translateService.get('DATA_PASSATA_MESSAGE').subscribe((data) => {
      this.validationMessages.dataPrenotazione[1].message = data;
    });
    this.translateService.get('ORA_RICHIESTA_MESSAGE').subscribe((data) => {
      this.validationMessages.oraPrenotazione[0].message = data;
    });
    this.translateService.get('ORA_NON_CORRETTA_MESSAGE').subscribe((data) => {
      this.validationMessages.oraPrenotazione[1].message = data;
    });
    this.translateService.get('POSTI_RICHIESTI_MESSAGE').subscribe((data) => {
      this.validationMessages.postiPrenotazione[0].message = data;
    });
    this.translateService.get('POSTI_NON_CORRETTI_MESSAGE').subscribe((data) => {
      this.validationMessages.postiPrenotazione[1].message = data;
    });
  }

  cercaPrenotazione(): void {
    this.errorePrenotazione = false;
    this.prenotazione = this.verificaForm.value;
    this.prenotazioneService.verificarPrenotazione(this.data.idRistorante, this.verificaForm.value.dataPrenotazione, this.verificaForm.value.oraPrenotazione, this.verificaForm.value.postiPrenotazione).subscribe({
      next: (data) => {
        console.log("data");
        console.log(data);
        if (data === true) {
          this.dialogRef.close();
          this.openDialogPrenotazione();
        } else {
          this.errorePrenotazione = true;
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 400) {
          console.error('Verifiva prenotazioni request error: ' + error.status);
          window.alert("Errore server 400");
        }
        if (error.status === 403) {
          console.error('Verifiva prenotazioni request error: ' + error.status);
          window.alert("Errore server 403");
        }

        if (error.status === 404) {
          console.error('Verifiva prenotazioni request error: ' + error.status);
          window.alert("Errore server 404");
        }
        if (error.status === 500) {
          console.error('Verifiva prenotazioni request error: ' + error.status);
          window.alert("Errore server 500");
        }
      }
    });
  }

  openDialogPrenotazione(): void {
    this.dialog.open(RistorantePrenotazionePrenotaComponent, {
      data: {
        idRistorante: this.data.idRistorante,
        data: this.verificaForm.value.dataPrenotazione,
        ora: this.verificaForm.value.oraPrenotazione,
        numeroPosti: this.verificaForm.value.postiPrenotazione
      }
    });
  }

  getOrari(): void {
    this.verificaForm.get('oraPrenotazione')?.disable();
    if (this.verificaForm.get('dataPrenotazione')?.valid) {
      this.verificaForm.get('oraPrenotazione')?.enable();
      this.verificaForm.get('postiPrenotazione')?.enable();
      this.ristoranteService.getOrari(this.data.idRistorante, this.verificaForm.value.dataPrenotazione).subscribe({
        next: (data) => {
          this.orari = data;
        }, error: (error: HttpErrorResponse) => {
          if (error.status === 500) {
            console.error('Ristorante Page request error: ' + error.status);
            window.alert("Errore server 500");
          }
        }
      });
    }
  }

}
