import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Ricerca} from "../../components/ricerca-ristorante-modal/ricerca-ristorante-modal.component";
import {map, Observable} from "rxjs";
import {RistoranteService} from 'src/app/services/ristorante.service';
import {Ristorante} from "../../model/ristorante";
import {HttpErrorResponse} from "@angular/common/http";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-ricerca-ristoranti-page',
  templateUrl: './ricerca-ristoranti-page.component.html',
  styleUrls: ['./ricerca-ristoranti-page.component.css']
})
export class RicercaRistorantiPageComponent implements OnInit {
  loading = true;

  ricerca$: Observable<Ricerca> = new Observable<Ricerca>();

  ristoranti?: Ristorante[];

  pageIndex: number = 0;
  pageSize: number = 1;
  lowValue: number = 0;
  highValue: number = 1;
  pageSizeOptions = [1, 5, 10];
  showFirstLastButtons = true;

  constructor(private route: ActivatedRoute,
              private ristoranteService: RistoranteService) {
  }

  ngOnInit(): void {
    this.ricerca$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => {
        return {cosa: params.get("cosa"), dove: params.get("dove")};
      }));
    this.ricerca$.subscribe(ric => {
      console.log(ric);
      this.ristoranteService.getRicercaRistorantiByRicerca(ric).subscribe({
        next: (data) => {
          this.ristoranti = data;
          this.loading = false;
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 500) {
            console.error('Ristorante Page request error: ' + error.status);
            window.alert("Errore server 500");
            this.loading = false;
          }
        }
      })
    });
  }

  getPaginatorData(event: PageEvent) {
    console.log(event);
    if (event.pageSize != this.pageSize) {
      this.pageSize = event.pageSize;
      this.highValue = event.pageSize;
    } else {
      if (event.pageIndex === this.pageIndex + 1) {
        this.lowValue = this.lowValue + this.pageSize;
        this.highValue = this.highValue + this.pageSize;
      } else if (event.pageIndex === this.pageIndex - 1) {
        this.lowValue = this.lowValue - this.pageSize;
        this.highValue = this.highValue - this.pageSize;
      }

      this.pageIndex = event.pageIndex;
    }
  }
}
