import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {AUTH_TOKEN, URL, X_AUTH} from "../constants";
import {BehaviorSubject, map, Observable} from "rxjs";

export interface Account {
  username: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authToken: string = '';
  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    let token: string | null = localStorage.getItem(AUTH_TOKEN);
    if (token !== null && token !== undefined && token !== '') {
      this.authToken = token;
      console.log('this.authToken');
      console.log(this.authToken);
      this.loggedIn$.next(true);
    }
  }

  /**
   * Funzione che restituisce il token per autenticare le richieste Rest
   */
  getToken(): string {
    return this.authToken;
  }


  /**
   * Funzione che ritorna Observable della variabile loggedIn che serve per vedere se l'utenza è loggata o meno
   */
  isLogged(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  /**
   * Funzione per l'esecuzione del login
   * @param account Interfaccia che ha solo email e password
   */
  login(account: Account): Observable<any> {
    return this.http.post<any>(URL.LOGIN, account, {observe: 'response'}).pipe(
      map((resp: HttpResponse<any>) => {
        console.log('response login');
        console.log(resp)
        const token = resp.headers.get(X_AUTH);
        console.log('token dal server');
        console.log(token);
        if(token != null || token != undefined) {
          localStorage.setItem(AUTH_TOKEN, token);
          this.authToken = token;
        }
        this.loggedIn$.next(true);
        console.log('setto loggedIn in loggedIn$');
        console.log(resp);
        return resp.body;
      }));
  }

  /**
   * Funzione che resetta tutta l'appicazione, usata per il logout dell'utenza.
   */
  logout() {
    localStorage.removeItem(AUTH_TOKEN);
    this.authToken = '';
    this.loggedIn$.next(false);
  }

  }
