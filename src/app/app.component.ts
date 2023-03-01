import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LinguaService} from "./services/lingua.service";
import {UserService} from './services/user.service';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from '@angular/router';
import {User} from "./model/user";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {
  Ricerca,
  RicercaRistoranteModalComponent
} from "./components/ricerca-ristorante-modal/ricerca-ristorante-modal.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Where2Eat';
  linguaScelta = 'it';
  logenIn$: Observable<boolean>;
  user$: Observable<User>;
  searchFormModel: FormGroup;

  constructor(private translate: TranslateService,
              private linguaService: LinguaService,
              private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,
              private dialog: MatDialog) {
    this.initTranslate();
    this.logenIn$ = userService.isLogged();
    this.user$ = userService.getUser();
    this.searchFormModel = this.formBuilder.group({
      cosa: ['', []],
      dove: ['', []]
    });
  }


  initTranslate() {
    this.linguaScelta = this.linguaService.getLinguaAttuale()
    this.translate.setDefaultLang(this.linguaScelta);
  }

  changeLingua() {
    console.log("Cambio")
    if (this.linguaScelta === 'it') {
      this.linguaService.updateLingua('en');
      this.linguaScelta = 'en'
    } else {
      this.linguaService.updateLingua('it');
      this.linguaScelta = 'it';
    }
    this.translate.setDefaultLang(this.linguaScelta);
  }

  setContainerCondition(): boolean {
    return this.router.url.indexOf("/ristoranti/") <= -1;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  openDialogRicerca(): void {
    this.dialog.open(RicercaRistoranteModalComponent);
  }

  search() {
    const ricerca: Ricerca = this.searchFormModel.value;
    this.router.navigate(['/search'], {queryParams: ricerca});
  }
}
