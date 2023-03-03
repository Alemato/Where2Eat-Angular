import {Injectable} from '@angular/core';
import {LINGUA} from "../constants";

export interface Lingua {
  etichetta: string;
  valore: string;

}


@Injectable({
  providedIn: 'root'
})
export class LinguaService {
  italiano: Lingua = {etichetta: 'Italiano', valore: 'it'};
  lingue: Lingua[] = [this.italiano, {etichetta: 'English', valore: 'en'}];

  constructor() {
    let linguaStr: string | null = localStorage.getItem(LINGUA);
    if (linguaStr == null || linguaStr == '') {
      localStorage.setItem(LINGUA, "it");
    }
  }

  getLinguaAttuale(): string {
    let linguaStr: string | null = localStorage.getItem(LINGUA);
    if (linguaStr == null || linguaStr == '') {
      localStorage.setItem(LINGUA, "it");
      return "it";
    }
    return linguaStr;
  }

  getLinguaPreferita(): string {
    return this.italiano.valore;
  }

  getLingue(): Lingua[] {
    return this.lingue;
  }

  updateLingua(nuovaLingua: string) {
    localStorage.setItem(LINGUA, nuovaLingua);
  }

}
