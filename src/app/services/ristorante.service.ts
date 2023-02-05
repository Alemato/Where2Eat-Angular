import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ristorante} from "../model/ristorante";
import {Observable} from "rxjs";
import {URL} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class RistoranteService {

  constructor(private http: HttpClient) { }

  getRestHome(): Observable<Ristorante[]>{
    return this.http.get<Ristorante[]>(URL.RISTORANTI_HOME, {params: {'view': 'home'}});
  }
}
