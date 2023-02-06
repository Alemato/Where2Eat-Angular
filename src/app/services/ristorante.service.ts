import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ristorante} from "../model/ristorante";
import {Observable} from "rxjs";
import {URL} from "../constants";
import {Ricerca} from "../components/ricerca-ristorante-modal/ricerca-ristorante-modal.component";

@Injectable({
  providedIn: 'root'
})
export class RistoranteService {

  constructor(private http: HttpClient) {
  }

  getRestHome(): Observable<Ristorante[]> {
    return this.http.get<Ristorante[]>(URL.RISTORANTI_HOME, {params: {'view': 'home'}});
  }

  getRistoranteByIdRistorante(id: number): Observable<Ristorante> {
    return this.http.get<Ristorante>(URL.RISTORANTE_ID + id);
  }

  getRicercaRistorantiByRicerca(ricerca: Ricerca): Observable<Ristorante[]> {
    if (ricerca.dove != null || ricerca.dove != undefined) {
      if (ricerca.cosa != null || ricerca.cosa != undefined) {
        return this.http.get<Ristorante[]>(URL.SEARCH, {params: {'cosa': ricerca.cosa, 'dove': ricerca.dove}});
      } else {
        return this.http.get<Ristorante[]>(URL.SEARCH, {params: {'dove': ricerca.dove}});
      }
    } else return this.http.get<Ristorante[]>(URL.SEARCH);
  }
}
