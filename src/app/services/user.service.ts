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
  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private user$: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

  constructor(private http: HttpClient) {
    let token: string | null = localStorage.getItem(AUTH_TOKEN);
    if (token !== null && token !== undefined && token !== '') {
      this.authToken = token;
      console.log('this.authToken');
      console.log(this.authToken);
      this.loggedIn$.next(true);
    }
    let utente: string | null = localStorage.getItem(UTENTE_STORAGE);
    if (utente !== null && utente !== undefined && utente !== '') {
      console.log('Utente');
      console.log(utente);
      this.user$.next(JSON.parse(utente));
    }
  }

  /**
   * Funzione che restituisce il token per autenticare le richieste Rest
   */
  getToken(): string {
    return this.authToken;
  }

  /**
   * Funzione che restituisce il l'oggetto utente
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
        if (token != null || token != undefined) {
          localStorage.setItem(AUTH_TOKEN, token);
          this.authToken = token;
        }
        this.editUserLocalData(resp.body);
        this.user$.next(resp.body);
        this.loggedIn$.next(true);
        console.log('setto loggedIn in loggedIn$');
        console.log(resp);
        return resp.body;
      }), catchError(this.handleError));
  }

  /**
   * Funzione che resetta tutta l'appicazione, usata per il logout dell'utenza.
   */
  logout() {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(UTENTE_STORAGE);
    this.authToken = '';
    this.loggedIn$.next(false);
    this.user$.next({} as User);
  }

  editUserLocalData(user: User) {
    localStorage.setItem(UTENTE_STORAGE, JSON.stringify(user));
    this.user$.next(user);
  }

  editUserData(user: User): Observable<any> {
    return this.http.patch<any>(URL.ACCOUNT, user, {observe: 'response'}).pipe(
      map((resp: HttpResponse<any>) => {
        console.log('response modifica utente');
        console.log(resp)
      }));
  }

  registration(newUser: NewUser): Observable<any> {
    return this.http.post<any>(URL.ACCOUNT, newUser, {observe: 'response'}).pipe(
      map((resp: HttpResponse<any>) => {
        console.log('response registrazione utente');
        console.log(resp)
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
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    // return throwError(() => new ErrorEvent("Something bad happened; please try again later"));
    return throwError(() => error);
  }
}
