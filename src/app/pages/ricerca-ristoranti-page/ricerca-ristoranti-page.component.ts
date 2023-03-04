import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RistoranteService} from 'src/app/services/ristorante.service';
import {Ristorante} from "../../model/ristorante";
import {HttpErrorResponse} from "@angular/common/http";
import {PageEvent} from "@angular/material/paginator";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-ricerca-ristoranti-page',
  templateUrl: './ricerca-ristoranti-page.component.html',
  styleUrls: ['./ricerca-ristoranti-page.component.css']
})
export class RicercaRistorantiPageComponent implements OnInit {
  loading = true;

  ristoranti?: Ristorante[];

  pageIndex: number = 0;
  pageSize: number = 1;
  lowValue: number = 0;
  highValue: number = 1;
  pageSizeOptions = [1, 5, 10];
  showFirstLastButtons = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ristoranteService: RistoranteService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const ric = {cosa: params.get("cosa"), dove: params.get("dove")};
      this.ristoranteService.getRicercaRistorantiByRicerca(ric).subscribe({
        next: (data) => {
          this.ristoranti = data;
          this.loading = false;
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 500) {
            console.error('Ricerca Ristoranti Page request error: ' + error.status);
            window.alert("Errore server 500");
          }
          this.loading = false;
          if (error.status === 403) {
            console.error('Ricerca Ristoranti Page request error: ' + error.status);
            window.alert("Accesso negato");
            this.userService.logout();
            this.router.navigate(["/login"]);
          }
        }
      })
    });
  }

  getPaginatorData(event: PageEvent) {
    if (event.pageSize != this.pageSize) {
      this.pageSize = event.pageSize;
      this.highValue = event.pageSize;
      this.pageIndex = 0;
      this.lowValue = 0;
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
