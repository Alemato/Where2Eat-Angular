import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Ristorante} from "../model/ristorante";
import {catchError, Observable, retry, throwError} from "rxjs";
import {URL} from "../constants";
import {Ricerca} from "../components/ricerca-ristorante-modal/ricerca-ristorante-modal.component";
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class RistoranteService {

  constructor(private http: HttpClient) {
  }

  getRestHome(): Observable<Ristorante[]> {
    return this.http.get<Ristorante[]>(URL.RISTORANTI_HOME, {params: {'view': 'home'}}).pipe(retry(3), catchError(this.handleError));
  }

  getRistoranteByIdRistorante(id: number): Observable<Ristorante> {
    return this.http.get<Ristorante>(URL.RISTORANTE_ID + id).pipe(retry(3), catchError(this.handleError));
  }

  getRicercaRistorantiByRicerca(ricerca: Ricerca): Observable<Ristorante[]> {
    if (ricerca.dove != null || ricerca.dove != undefined) {
      if (ricerca.cosa != null || ricerca.cosa != undefined) {
        return this.http.get<Ristorante[]>(URL.SEARCH, {
          params: {
            'cosa': ricerca.cosa,
            'dove': ricerca.dove
          }
        }).pipe(retry(3), catchError(this.handleError));
      } else {
        return this.http.get<Ristorante[]>(URL.SEARCH, {params: {'dove': ricerca.dove}}).pipe(retry(3), catchError(this.handleError));
      }
    } else return this.http.get<Ristorante[]>(URL.SEARCH).pipe(retry(3), catchError(this.handleError));
  }

  getOrari(id: number, data: string): Observable<string[]> {
    return this.http.get<string[]>(URL.RISTORANTE_ID + id + URL.ORARI, {params: {'data': formatDate(data, 'dd/MM/yyyy', "en-GB")}}).pipe(retry(3), catchError(this.handleError));
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
