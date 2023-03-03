import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {AUTH_TOKEN, URL, UTENTE_STORAGE, X_AUTH} from "../constants";
import {BehaviorSubject, catchError, map, Observable, retry, tap, throwError} from "rxjs";
import {User} from "../model/user";

export interface Account {
  username: string;
  password: string;
}

export interface NewUser {
  nome: string;
  cognome: string;
  telefono: string;
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authToken: string = '';
  private user$: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

  constructor(private http: HttpClient
  ) {
    let token: string | null = localStorage.getItem(AUTH_TOKEN);
    let utente: string | null = localStorage.getItem(UTENTE_STORAGE);
    if (utente !== null && utente !== undefined && utente !== '' && token !== null && token !== undefined && token !== '') {
      console.log('Utente');
      console.log(utente);
      this.user$.next(JSON.parse(utente));
      console.log('this.authToken');
      console.log(this.authToken);
      this.authToken = token;
    } else {
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(UTENTE_STORAGE);
    }
  }

  /**
   * Funzione che restituisce il token per autenticare le richieste Rest
   */
  getToken(): string {
    return this.authToken;
  }

  /**
   * Funzione che restituisce l'Observable dell'oggetto utente
   */
  getUser(): Observable<User> {
    return this.user$.asObservable();
  }

  getUserFromServer(): Observable<User> {
    return this.http.get<User>(URL.ACCOUNT).pipe(tap((user: User) => {
      this.user$.next(user);
      this.editUserLocalData(user);
    }), retry(3), catchError(this.handleError));
  }

  /**
   * Algoritmo di decodifica del exp nel token:
   * 1. separare il token con i punti e prendere la seconda porzione della stringa
   * 2. prendere la stringa e decodificare in base 64
   * 3. prendere l'exp
   * 4. Calcolare con la data di oggi in ms / 1000 e arrotondare
   * 5. controllare se ciò che è calcolato è <= di quello ricevuto dal token
   * @param token
   * @private
   */
  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  /**
   * Funzione che ritorna un booleano che serve per vedere se l'utenza è loggata o meno
   */
  isAuthenticated(): boolean {
    let tokenExpired: boolean = false;
    let token: string | null = localStorage.getItem(AUTH_TOKEN);
    if (token !== null && token !== undefined && token !== '') {
      if (this.tokenExpired(token)) {
        this.logout();
        tokenExpired = true;
        return tokenExpired
      }
      return !tokenExpired;
    }
    return false;
  }

  /**
   * Funzione per l'esecuzione del login
   * @param account Interfaccia che ha solo email e password
   */
  login(account: Account): Observable<any> {
    return this.http.post<any>(URL.LOGIN, account, {observe: 'response'}).pipe(
      map((resp: HttpResponse<any>) => {
        console.log('response login');
        console.log(resp);
        const token = resp.headers.get(X_AUTH);
        console.log('token dal server');
        console.log(token);
        if (token != null || token != undefined) {
          localStorage.setItem(AUTH_TOKEN, token);
          this.authToken = token;
          this.editUserLocalData(resp.body);
        } else {
          window.alert("Errore durante l'autenticazione");
        }
        return resp.body;
      }), retry(3), catchError(this.handleError));
  }

  /**
   * Funzione che resetta tutta l'applicazione, usata per il logout dell'utenza.
   */
  logout() {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(UTENTE_STORAGE);
    this.authToken = '';
    this.user$.next({} as User);
  }

  editUserLocalData(user: User) {
    localStorage.setItem(UTENTE_STORAGE, JSON.stringify(user));
    console.log('setto loggedIn in loggedIn$');
    this.user$.next(user);
  }

  editUserData(user: User): Observable<any> {
    return this.http.patch<any>(URL.ACCOUNT, user, {observe: 'response'}).pipe(
      map((resp: HttpResponse<any>) => {
        console.log('response modifica utente');
        console.log(resp)
      }), retry(3), catchError(this.handleError));
  }

  registration(newUser: NewUser): Observable<any> {
    return this.http.post<any>(URL.ACCOUNT, newUser, {observe: 'response'}).pipe(
      map((resp: HttpResponse<any>) => {
        console.log('response registrazione utente');
        console.log(resp)
      }), retry(3), catchError(this.handleError));
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
