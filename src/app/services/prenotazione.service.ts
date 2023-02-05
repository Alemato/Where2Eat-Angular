import {Injectable} from '@angular/core';
import {Prenotazione} from "../model/prenotazione";
import {map, Observable} from "rxjs";
import {URL} from "../constants";
import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {


  constructor(private http: HttpClient) {
    /*this.prenotazioniFuture = [
      {
        id: 1,
        data: new Date(),
        ora: new Date(),
        statoPrenotazione: 1,
        numeroPosti: 10,
        nomeristorante: "Villa Crespi1"
      },
      {
        id: 2,
        data: new Date(),
        ora: new Date(),
        statoPrenotazione: 1,
        numeroPosti: 10,
        nomeristorante: "Villa Crespi2"
      }
    ]
    this.prenotazioniPassate = [
      {
        id: 3,
        data: new Date(),
        ora: new Date(),
        statoPrenotazione: 2,
        numeroPosti: 10,
        nomeristorante: "Villa Credddddddddddddddddddddddddddddddspi2"
      },
      {
        id: 4,
        data: new Date(),
        ora: new Date(),
        statoPrenotazione: 3,
        numeroPosti: 11,
        nomeristorante: "Villa Crespi3"
      },
      {
        id: 5,
        data: new Date(),
        ora: new Date(),
        statoPrenotazione: 4,
        numeroPosti: 11,
        nomeristorante: "Villa Crespi4"
      },
      {
        id: 6,
        data: new Date(),
        ora: new Date(),
        statoPrenotazione: 4,
        numeroPosti: 11,
        nomeristorante: "Villa Crespi5"
      }
    ]*/
  }

  getAllPrenotazioniUser(): Observable<Prenotazione[]> {
    return this.http.get<Prenotazione[]>(URL.LISTA_PRENOTAZIONI_CLIENTE);
  }

  // getAllPrenotazioniUser(): Observable<string> {
  //   return this.http.get<string>(URL.lISTA_PRENOTAZIONI_CLIENTE,{observe: 'response'}).pipe(
  //     map((resp: HttpResponse<string>) => {
  //       return resp.body;
  //     }
  //   );
  // }

  cancelPrenotazione(prenotazione: Prenotazione): Observable<any> {
    console.log("delete prenotazione");
    console.log(prenotazione);
    const modPrenotazione = {"id": prenotazione.id, "stato": 3}
    console.log("modPrenotazione");
    console.log(modPrenotazione);

    return this.http.patch<any>(URL.RISTORANTE + "/" + prenotazione.id + "/prenotazioni", modPrenotazione,
      {observe: 'response'}).pipe(
      map((resp: HttpResponse<any>) => {

        console.log('response cancel prenotazione');
        console.log(resp)
      }));
  }
}
