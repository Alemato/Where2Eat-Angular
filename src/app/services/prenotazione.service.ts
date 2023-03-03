import {Injectable} from '@angular/core';
import {Prenotazione} from "../model/prenotazione";
import {catchError, map, Observable, retry, throwError} from "rxjs";
import {URL} from "../constants";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {formatDate} from "@angular/common";

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
    const verificaPrenotazione = {
      "data": formatDate(data, 'dd/MM/yyyy', "en-GB"),
      "ora": ora,
      "numeroPosti": numeroPosti
    };
    return this.http.post<any>(URL.RISTORANTE + "/" + idRistorante + "/prenotazioni/verifica", verificaPrenotazione, {observe: 'response'}).pipe(
      map((resp: HttpResponse<any>) => {
        console.log('response verify prenotazione');
        console.log(resp.body)
        return resp.body;
      }), retry(3), catchError(this.handleError));
  }

  creaPrenotazione(idRistorante: number, data: string, ora: string, numeroPosti: number): Observable<any> {
    const verificaPrenotazione = {
      id: idRistorante,
      data: formatDate(data, 'dd/MM/yyyy', "en-GB"),
      ora: ora,
      numeroPosti: numeroPosti
    };
    return this.http.post<any>(URL.PRENOTAZIONI_CLIENTE, verificaPrenotazione, {observe: 'response'}).pipe(
      map((resp: HttpResponse<any>) => {
        console.log('response create prenotazione');
        console.log(resp.body)
      }));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, Body:`
      );
      console.error(error.error);
    }
    // return an observable error
    return throwError(() => error);
  }
}
