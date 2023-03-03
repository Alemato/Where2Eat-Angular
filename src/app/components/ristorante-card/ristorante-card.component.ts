import {Component, Input} from '@angular/core';
import {Ristorante} from "../../model/ristorante";
import {URL_BASE_IMG} from "../../constants";

@Component({
  selector: 'app-ristorante-card',
  templateUrl: './ristorante-card.component.html',
  styleUrls: ['./ristorante-card.component.css']
})
export class RistoranteCardComponent {

  urlImmagine = URL_BASE_IMG;

  @Input()
  ristorante?: Ristorante;

}
