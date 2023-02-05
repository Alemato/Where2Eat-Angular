import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {
  RistorantePrenotazioneVerificaComponent
} from "../../components/ristorante-prenotazione-verifica/ristorante-prenotazione-verifica.component";
import {Ristorante} from "../../model/ristorante";
import {RistoranteService} from "../../services/ristorante.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Recensione} from "../../model/recensione";
import {ServiziMetodiPagamentoTipologiaCucina} from "../../model/servizi-metodi-pagamento-tipologia-cucina";

@Component({
  selector: 'app-ristorante-page',
  templateUrl: './ristorante-page.component.html',
  styleUrls: ['./ristorante-page.component.css']
})
export class RistorantePageComponent implements OnInit {
  private idRistorante: number = -1;
  ristorante?: Ristorante;

  constructor(private router: ActivatedRoute,
              private route: Router,
              private dialog: MatDialog,
              private ristoranteService: RistoranteService
  ) {
    console.log("Creo Componente pagina Ristorante");
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.idRistorante = parseInt(params.get('id')!, 0);
      this.ristoranteService.getRistoranteByIdRistorante(this.idRistorante).subscribe({
        next: (data) => {
          this.ristorante = data;
        }, error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            console.error('Ristorante Page request error: ' + error.status);
            this.route.navigate(["/404"]);
          }
          if (error.status === 500) {
            console.error('Ristorante Page request error: ' + error.status);
            window.alert("Errore server 500");
          }
        }
      });
    });
  }

  openDialogVerificaPrenotazione(): void {
    const dialogRef = this.dialog.open(RistorantePrenotazioneVerificaComponent, {
      data: {id: this.idRistorante}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getAverage(rec: Recensione[] | null): string {
    if (rec == null) {
      return "0.0";
    }
    if (rec.length > 0) {
      const voti = rec.map(x => x.voto);
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

  splitServiziQuattroColonne(serv: Array<ServiziMetodiPagamentoTipologiaCucina>): Array<Array<ServiziMetodiPagamentoTipologiaCucina>> {
    if (serv.length > 0) {
      if (serv.length >= 4) {
        let result = [];
        const offset = Math.floor(serv.length / 4);
        console.log("offset: ", offset);
        const arry1 = serv.slice(0, offset);
        console.log("arry1: ", arry1);
        const arry2 = serv.slice(offset, offset + offset);
        console.log("arry2: ", arry2);
        const arry3 = serv.slice(offset + offset + offset, offset + offset + offset + offset);
        console.log("arry3: ", arry3);
        const arry4 = serv.slice(offset + offset + offset + offset);
        console.log("arry4: ", arry4);
        result.push(arry1);
        result.push(arry2);
        result.push(arry3);
        result.push(arry4);
        console.log("result: ", result);
        return result;
      } else if (serv.length === 3) {
        let result = [];
        const arry1 = serv.slice(0, 1);
        const arry2 = serv.slice(1, 2);
        const arry3 = serv.slice(2);
        result.push(arry1);
        result.push(arry2);
        result.push(arry3);
        console.log("result: ", result);
        return result;
      } else if (serv.length == 2) {
        let result = [];
        const arry1 = serv.slice(0, 1);
        const arry2 = serv.slice(1);
        result.push(arry1);
        result.push(arry2);
        return result;
      } else if (serv.length == 1) {
        let result = [];
        const arry1 = serv.slice(0);
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
