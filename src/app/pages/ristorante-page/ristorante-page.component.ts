import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {
  RistorantePrenotazioneVerificaComponent
} from "../../components/ristorante-prenotazione-verifica/ristorante-prenotazione-verifica.component";
import {Ristorante} from "../../model/ristorante";
import {RistoranteService} from "../../services/ristorante.service";
import {HttpErrorResponse} from "@angular/common/http";
import {URL_BASE_IMG} from "../../constants";
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-ristorante-page',
  templateUrl: './ristorante-page.component.html',
  styleUrls: ['./ristorante-page.component.css']
})
export class RistorantePageComponent implements OnInit {
  private idRistorante: number = -1;
  ristorante?: Ristorante;
  urlImmagine = URL_BASE_IMG;
  loading: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private ristoranteService: RistoranteService,
              private userService: UserService
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idRistorante = parseInt(params.get('id')!, 0);
      if (isNaN(this.idRistorante)) {
        this.router.navigate(["/404"]);
      } else
        this.ristoranteService.getRistoranteByIdRistorante(this.idRistorante).subscribe({
          next: (data) => {
            this.ristorante = data;
            this.loading = false;
          }, error: (error: HttpErrorResponse) => {
            if (error.status === 500) {
              console.error('Ristorante Page request error: ' + error.status);
              window.alert("Errore server 500");
            }
            this.loading = false;
            if (error.status === 404) {
              console.error('Ristorante Page request error: ' + error.status);
              this.router.navigate(["/404"]);
            }
            if (error.status === 403) {
              console.error('Ristorante Page request error: ' + error.status);
              window.alert("Accesso negato");
              this.userService.logout();
              this.router.navigate(["/login"]);
            }
          }
        });
    });
  }

  openDialogVerificaPrenotazione(): void {
    const dialogRef = this.dialog.open(RistorantePrenotazioneVerificaComponent, {
      data: {idRistorante: this.idRistorante}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
