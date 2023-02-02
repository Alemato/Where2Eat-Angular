import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LinguaService} from "./services/lingua.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menu = true;
  title = 'Where2Eat';
  linguaScelta = 'it';


  constructor(private translate: TranslateService,
              private linguaService: LinguaService) {
    this.initTranslate();
  }

  show_hideMenu() {
    this.menu = !this.menu;
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
}
