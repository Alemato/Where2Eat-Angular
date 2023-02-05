import {Component, Inject} from '@angular/core';
import {Prenotazione} from "../../model/prenotazione";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ristorante-prenotazione-prenota',
  templateUrl: './ristorante-prenotazione-prenota.component.html',
  styleUrls: ['./ristorante-prenotazione-prenota.component.css']
})
export class RistorantePrenotazionePrenotaComponent {

  prenotazione?: Prenotazione;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { data: Date, ora: Date, numeroPosti: number },
              public dialogRef: MatDialogRef<RistorantePrenotazionePrenotaComponent>,
              private router: Router) {
  }

  onNoClick(): void {
    console.log("Annullato");
    this.dialogRef.close();
  }

  onSiClick() {
    console.log("Prenotato");
    this.dialogRef.close();
    //TODO rest Prenotazione
    this.router.navigate(['/prenotazioni']).then(r => {
    })
  }
}
