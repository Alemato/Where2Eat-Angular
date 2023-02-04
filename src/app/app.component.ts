import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LinguaService} from "./services/lingua.service";
import { UserService } from './services/user.service';
import {BehaviorSubject, Observable} from "rxjs";
import { Router } from '@angular/router';
import {User} from "./model/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Where2Eat';
  linguaScelta = 'it';
  logenIn$: Observable<boolean>;
  user$: BehaviorSubject<User>;

  constructor(private translate: TranslateService,
              private linguaService: LinguaService,
              private userService: UserService,
              private router: Router) {
    this.initTranslate();
    this.logenIn$ = userService.isLogged();
    this.user$ = userService.getUser();
  }

  initTranslate() {
    this.linguaScelta = this.linguaService.getLinguaAttuale()
    this.translate.setDefaultLang(this.linguaScelta);
  }

  changeLingua(){
    console.log("Cambio")
    if(this.linguaScelta === 'it') {
      this.linguaService.updateLingua('en');
      this.linguaScelta = 'en'
    } else {
      this.linguaService.updateLingua('it');
      this.linguaScelta = 'it';
    }
    this.translate.setDefaultLang(this.linguaScelta);
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
