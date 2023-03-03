import {Component} from '@angular/core';
import {Prenotazione} from "../../model/prenotazione";
import {PrenotazioneService} from "../../services/prenotazione.service";
import {HttpErrorResponse} from "@angular/common/http";
import {PageEvent} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

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

  pageIndex: number = 0;
  pageSize: number = 1;
  lowValue: number = 0;
  highValue: number = 1;
  pageSizeOptions = [1, 5, 10];
  showFirstLastButtons = true;

  constructor(private router: Router,
              private prenotazioniService: PrenotazioneService,
              private userService: UserService
  ) {
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
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        console.log(error);
        if (error.status === 400) {
          console.error('Delete Prenotazione request error: ' + error.status);
          window.alert("Errore server 400");
        }
        if (error.status === 403) {
          console.error('Delete Prenotazione request error: ' + error.status);
          window.alert("Accesso negato");
          this.userService.logout();
          this.router.navigate(["/login"]);
        }
        if (error.status === 404) {
          console.error('Delete Prenotazione request error: ' + error.status);
          window.alert("Errore server 404");
          this.router.navigate(["/404"]);
        }
        if (error.status === 500) {
          console.error('Delete Prenotazione request error: ' + error.status);
          window.alert("Errore server 500");
        }
      }
    });
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
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        console.log(error);
        if (error.status === 403) {
          window.alert("Errore server 403");
        }
        if (error.status === 500) {
          window.alert("Errore server 500");
        }
      }
    })
  }

  getPaginator(event: PageEvent) {
    console.log(event);
    if (event.pageSize != this.pageSize) {
      this.pageSize = event.pageSize;
      this.highValue = event.pageSize;
      this.pageIndex = 0;
      this.lowValue = 0;
    } else {
      if (event.pageIndex === this.pageIndex + 1) {
        this.lowValue = this.lowValue + this.pageSize;
        this.highValue = this.highValue + this.pageSize;
      } else if (event.pageIndex === this.pageIndex - 1) {
        this.lowValue = this.lowValue - this.pageSize;
        this.highValue = this.highValue - this.pageSize;
      }
      this.pageIndex = event.pageIndex;
    }
  }
}
