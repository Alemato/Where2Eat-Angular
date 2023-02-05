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
  }

  getAllPrenotazioniUser(): Observable<Prenotazione[]> {
    return this.http.get<Prenotazione[]>(URL.PRENOTAZIONI_CLIENTE);
  }

  cancelPrenotazione(prenotazione: Prenotazione): Observable<any> {
    const modPrenotazione = {id: prenotazione.id, stato: 3}
    return this.http.patch<any>(URL.RISTORANTE + "/" + prenotazione.ristorante.id + "/prenotazioni", modPrenotazione,
      {observe: 'response'}).pipe(
      map((resp: HttpResponse<any>) => {
        console.log('response cancel prenotazione');
        console.log(resp)
      }));
  }

  verificarPrenotazione(idRistorante: number, data: string, ora: string, numeroPosti: number): Observable<any> {
    const verificaPrenotazione = {"data": data, "ora": ora, "numeroPosti": numeroPosti};
    return this.http.post<any>(URL.RISTORANTE + "/" + idRistorante + "/prenotazioni/verifica", verificaPrenotazione, {observe: 'response'}).pipe(
      map((resp: HttpResponse<any>) => {
        console.log('response verify prenotazione');
        console.log(resp.body)
        return resp.body;
      }));
  }

  creaPrenotazione(idRistorante: number, data: string, ora: string, numeroPosti: number): Observable<any> {
    const verificaPrenotazione = {id: idRistorante, data: data, ora: ora, numeroPosti: numeroPosti};
    return this.http.post<any>(URL.PRENOTAZIONI_CLIENTE, verificaPrenotazione, {observe: 'response'}).pipe(
      map((resp: HttpResponse<any>) => {
        console.log('response create prenotazione');
        console.log(resp.body)
      }));
  }
}
