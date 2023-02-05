import {Component, Input} from '@angular/core';
import {Ristorante} from "../../model/ristorante";
import {Recensione} from "../../model/recensione";
import {URL_BASE_IMG} from "../../constants";

@Component({
  selector: 'app-ristorante-card',
  templateUrl: './ristorante-card.component.html',
  styleUrls: ['./ristorante-card.component.css']
})
export class RistoranteCardComponent {

  URL_BASE_IMG = URL_BASE_IMG;

  @Input()
  ristorante?: Ristorante;

  getAverage(rec: Recensione[] | null): string {
    if(rec == null){
      return "0.0";
    }
    if(rec.length>0){
      const voti = rec.map(x=>x.voto);
      const initialValue = 0;
      const sumWithInitial = voti.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      );
      const result = (sumWithInitial / voti.length).toPrecision(2);
      console.log(voti);
      console.log(sumWithInitial);
      console.log(result);
      return String(result);
    }
    return "0.0";
  }

}
