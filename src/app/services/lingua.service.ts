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
  italiano: Lingua = {etichetta: 'ITALIAN', valore: 'it'};
  lingue: Lingua[] = [this.italiano, {etichetta: 'ENGLISH', valore: 'en'}];

  constructor() {
    let linguaStr: string | null = localStorage.getItem(LINGUA);
    if (linguaStr == null || linguaStr == '') {
      localStorage.setItem(LINGUA, this.getLinguaPredefinita());
    }
  }

  getLinguaAttuale(): string {
    let linguaStr: string | null = localStorage.getItem(LINGUA);
    if (linguaStr == null || linguaStr == '') {
      localStorage.setItem(LINGUA, this.getLinguaPredefinita());
      return this.getLinguaPredefinita();
    }
    return linguaStr;
  }

  getLinguaPredefinita(): string {
    return this.italiano.valore;
  }

  getLingue(): Lingua[] {
    return this.lingue;
  }

  updateLingua(nuovaLingua: string) {
    localStorage.setItem(LINGUA, nuovaLingua);
  }

}
