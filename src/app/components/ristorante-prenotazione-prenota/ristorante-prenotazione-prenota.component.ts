import {Component, Inject} from '@angular/core';
import {Prenotazione} from "../../model/prenotazione";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {PrenotazioneService} from "../../services/prenotazione.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-ristorante-prenotazione-prenota',
  templateUrl: './ristorante-prenotazione-prenota.component.html',
  styleUrls: ['./ristorante-prenotazione-prenota.component.css']
})
export class RistorantePrenotazionePrenotaComponent {

  prenotazione?: Prenotazione;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { idRistorante: number, data: string, ora: string, numeroPosti: number },
              private dialogRef: MatDialogRef<RistorantePrenotazionePrenotaComponent>,
              private router: Router,
              private prenotazioneService: PrenotazioneService) {
  }

  onNoClick(): void {
    console.log("Annullato");
    this.dialogRef.close();
  }

  onSiClick() {
    console.log("Prenotato");
    this.prenotazioneService.creaPrenotazione(this.data.idRistorante, this.data.data, this.data.ora, this.data.numeroPosti).subscribe({
      next: (data) => {
        this.dialogRef.close();
        this.router.navigate(['/prenotazioni']).then(r => {
        })
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 403) {
          console.error('Crea prenotazione request error: ' + error.status);
          window.alert("Errore server 403");
        }
        if (error.status === 500) {
          console.error('Crea prenotazioni request error: ' + error.status);
          window.alert("Errore server 500");
        }
      }
    });
  }
}
