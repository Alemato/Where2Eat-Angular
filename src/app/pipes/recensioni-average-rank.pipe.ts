import {Pipe, PipeTransform} from '@angular/core';
import {Recensione} from "../model/recensione";

@Pipe({
  name: 'recensioniAverageRank'
})
export class RecensioniAverageRankPipe implements PipeTransform {

  transform(value: Recensione[] | null): string {
    if (value == null) {
      return "0.0";
    }
    if (value.length > 0) {
      const voti = value.map(x => x.voto);
      const initialValue = 0;
      const sumWithInitial = voti.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      );
      const result = (sumWithInitial / voti.length).toPrecision(2);
      return String(result);
    }
    return "0.0";
  }

}
