import {Pipe, PipeTransform} from '@angular/core';
import {ServiziMetodiPagamentoTipologiaCucina} from "../model/servizi-metodi-pagamento-tipologia-cucina";

@Pipe({
  name: 'splitServiziQuattroColonne'
})
export class SplitServiziQuattroColonnePipe implements PipeTransform {

  transform(value: Array<ServiziMetodiPagamentoTipologiaCucina>): Array<Array<ServiziMetodiPagamentoTipologiaCucina>> {
    if (value.length > 0) {
      if (value.length >= 4) {
        let result = [];
        const offset = Math.floor(value.length / 4);
        const arry1 = value.slice(0, offset);
        const arry2 = value.slice(offset, offset + offset);
        const arry3 = value.slice(offset + offset + offset, offset + offset + offset + offset);
        const arry4 = value.slice(offset + offset + offset + offset);
        result.push(arry1);
        result.push(arry2);
        result.push(arry3);
        result.push(arry4);
        return result;
      } else if (value.length === 3) {
        let result = [];
        const arry1 = value.slice(0, 1);
        const arry2 = value.slice(1, 2);
        const arry3 = value.slice(2);
        result.push(arry1);
        result.push(arry2);
        result.push(arry3);
        return result;
      } else if (value.length == 2) {
        let result = [];
        const arry1 = value.slice(0, 1);
        const arry2 = value.slice(1);
        result.push(arry1);
        result.push(arry2);
        return result;
      } else if (value.length == 1) {
        let result = [];
        const arry1 = value.slice(0);
        result.push(arry1);
        return result;
      } else {
        let result = [];
        const arry1 = [{} as ServiziMetodiPagamentoTipologiaCucina];
        result.push(arry1);
        return result
      }
    } else {
      let result = [];
      const arry1 = [{} as ServiziMetodiPagamentoTipologiaCucina];
      result.push(arry1);
      return result
    }
  }
}
