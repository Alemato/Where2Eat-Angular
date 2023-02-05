import {Component} from '@angular/core';
import {Prenotazione} from "../../model/prenotazione";
import {PrenotazioneService} from "../../services/prenotazione.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-prenotazioni-page',
  templateUrl: './prenotazioni-page.component.html',
  styleUrls: ['./prenotazioni-page.component.css']
})
export class PrenotazioniPageComponent {

  prenotazioni?: Array<Prenotazione>;
  prenotazioniFuture: Array<Prenotazione> = [];
  prenotazioniPassate: Array<Prenotazione> = [];
  loading: boolean;

  constructor(private prenotazioniService: PrenotazioneService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.prenotazioniService.getAllPrenotazioniUser().subscribe({
      next: (data) => {
        this.prenotazioni = data;
        this.prenotazioni.forEach(prenotazione => {
          if (prenotazione.statoPrenotazione == 0 || prenotazione.statoPrenotazione == 1) {
            this.prenotazioniFuture.push(prenotazione);
          } else {
            this.prenotazioniPassate.push(prenotazione);
          }
        })
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 400) {
          console.error('Delete Prenotazione request error: ' + error.status);
          window.alert("Errore server 400");
        }
        if (error.status === 403) {
          console.error('Delete Prenotazione request error: ' + error.status);
          window.alert("Errore server 403");
        }
        if (error.status === 404) {
          console.error('Delete Prenotazione request error: ' + error.status);
          window.alert("Errore server 404");
        }
        if (error.status === 500) {
          console.error('Delete Prenotazione request error: ' + error.status);
          window.alert("Errore server 500");
        }
      }
    });
    this.loading = false;
  }

  deleteEvHandler(prenotazione: Prenotazione) {
    console.log(prenotazione.id);
    this.prenotazioniService.cancelPrenotazione(prenotazione).subscribe({
      next: (data) => {
        const objWithIdIndex = this.prenotazioniFuture?.findIndex((obj) => obj.id === prenotazione.id);
        if (objWithIdIndex != undefined && objWithIdIndex > -1) {
          let pren = this.prenotazioniFuture?.find(p => p.id == prenotazione.id);
          if (pren != undefined) {
            pren.statoPrenotazione = 2;
            this.prenotazioniPassate?.unshift(pren);
          }
          this.prenotazioniFuture?.splice(objWithIdIndex, 1);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 403) {
          console.error('Prenotazioni request error: ' + error.status);
          window.alert("Errore server 403");
        }
        if (error.status === 500) {
          console.error('Prenotazioni request error: ' + error.status);
          window.alert("Errore server 500");
        }
      }
    })
  }
}
